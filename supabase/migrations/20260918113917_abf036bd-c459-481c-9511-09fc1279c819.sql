CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

DO $$ BEGIN
  CREATE TYPE public.request_status AS ENUM ('pending','completed','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  additional_details TEXT,
  ip_hash TEXT,
  status public.request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  message TEXT,
  ip_hash TEXT,
  status public.request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.callback_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  additional_details TEXT,
  ip_hash TEXT,
  status public.request_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.website_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  ip_hash TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT now() + interval '30 minutes',
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_service_requests_status ON public.service_requests(status);
CREATE INDEX idx_service_requests_created_at ON public.service_requests(created_at DESC);
CREATE INDEX idx_service_requests_ip_hash ON public.service_requests(ip_hash, created_at DESC);
CREATE INDEX idx_contact_requests_status ON public.contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON public.contact_requests(created_at DESC);
CREATE INDEX idx_contact_requests_ip_hash ON public.contact_requests(ip_hash, created_at DESC);
CREATE INDEX idx_callback_requests_status ON public.callback_requests(status);
CREATE INDEX idx_callback_requests_created_at ON public.callback_requests(created_at DESC);
CREATE INDEX idx_callback_requests_ip_hash ON public.callback_requests(ip_hash, created_at DESC);
CREATE INDEX idx_website_sessions_ip_hash ON public.website_sessions(ip_hash);
CREATE INDEX idx_website_sessions_session_id ON public.website_sessions(session_id);
CREATE INDEX idx_website_sessions_active ON public.website_sessions(is_active, expires_at);

CREATE TRIGGER trg_service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_contact_requests_updated_at BEFORE UPDATE ON public.contact_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_callback_requests_updated_at BEFORE UPDATE ON public.callback_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

GRANT ALL ON public.service_requests TO service_role;
GRANT ALL ON public.contact_requests TO service_role;
GRANT ALL ON public.callback_requests TO service_role;
GRANT ALL ON public.website_sessions TO service_role;

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_sessions ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.submit_website_request(
  p_kind TEXT,
  p_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_business_name TEXT,
  p_details TEXT,
  p_service_name TEXT,
  p_ip_hash TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_recent INT;
  v_id UUID;
BEGIN
  IF p_ip_hash IS NULL OR length(p_ip_hash) < 16 THEN
    RAISE EXCEPTION 'invalid_request';
  END IF;
  IF length(coalesce(p_name,'')) < 2 OR length(p_name) > 120
     OR length(coalesce(p_email,'')) < 5 OR length(p_email) > 200
     OR p_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[A-Za-z]{2,}$'
     OR length(coalesce(p_phone,'')) < 7 OR length(p_phone) > 20
     OR length(coalesce(p_business_name,'')) > 150
     OR length(coalesce(p_details,'')) > 2000 THEN
    RAISE EXCEPTION 'invalid_request';
  END IF;

  SELECT
    (SELECT count(*) FROM public.service_requests WHERE ip_hash = p_ip_hash AND created_at > now() - interval '1 hour')
  + (SELECT count(*) FROM public.contact_requests WHERE ip_hash = p_ip_hash AND created_at > now() - interval '1 hour')
  + (SELECT count(*) FROM public.callback_requests WHERE ip_hash = p_ip_hash AND created_at > now() - interval '1 hour')
  INTO v_recent;

  IF v_recent >= 5 THEN
    RAISE EXCEPTION 'rate_limited';
  END IF;

  IF p_kind = 'service' THEN
    IF length(coalesce(p_service_name,'')) < 2 OR length(p_service_name) > 150 THEN
      RAISE EXCEPTION 'invalid_request';
    END IF;
    INSERT INTO public.service_requests (service_name, name, email, phone, business_name, additional_details, ip_hash)
    VALUES (p_service_name, p_name, p_email, p_phone, p_business_name, p_details, p_ip_hash)
    RETURNING id INTO v_id;
  ELSIF p_kind = 'contact' THEN
    INSERT INTO public.contact_requests (name, email, phone, business_name, message, ip_hash)
    VALUES (p_name, p_email, p_phone, p_business_name, p_details, p_ip_hash)
    RETURNING id INTO v_id;
  ELSIF p_kind = 'callback' THEN
    INSERT INTO public.callback_requests (name, email, phone, business_name, additional_details, ip_hash)
    VALUES (p_name, p_email, p_phone, p_business_name, p_details, p_ip_hash)
    RETURNING id INTO v_id;
  ELSE
    RAISE EXCEPTION 'invalid_request';
  END IF;

  RETURN v_id;
END $$;

CREATE OR REPLACE FUNCTION public.touch_website_session(
  p_session_id TEXT,
  p_ip_hash TEXT,
  p_user_agent TEXT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_active INT;
BEGIN
  IF p_session_id IS NULL OR length(p_session_id) < 16 OR length(p_session_id) > 64
     OR p_ip_hash IS NULL OR length(p_ip_hash) < 16 THEN
    RETURN false;
  END IF;

  UPDATE public.website_sessions
    SET is_active = false
    WHERE is_active AND expires_at < now();

  DELETE FROM public.website_sessions WHERE last_seen_at < now() - interval '7 days';

  UPDATE public.website_sessions
    SET last_seen_at = now(), expires_at = now() + interval '30 minutes', is_active = true
    WHERE session_id = p_session_id AND ip_hash = p_ip_hash;
  IF FOUND THEN
    RETURN true;
  END IF;

  SELECT count(*) INTO v_active
    FROM public.website_sessions
    WHERE ip_hash = p_ip_hash AND is_active AND expires_at > now();

  IF v_active >= 3 THEN
    RETURN false;
  END IF;

  INSERT INTO public.website_sessions (session_id, ip_hash, user_agent)
  VALUES (p_session_id, p_ip_hash, left(coalesce(p_user_agent,''), 300))
  ON CONFLICT (session_id) DO NOTHING;

  RETURN true;
END $$;

REVOKE ALL ON FUNCTION public.submit_website_request(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.touch_website_session(TEXT,TEXT,TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_website_request(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.touch_website_session(TEXT,TEXT,TEXT) TO anon, authenticated, service_role;