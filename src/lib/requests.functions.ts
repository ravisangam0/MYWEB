import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader, getRequestIP, setCookie } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "crypto";

import { requestSchema, type RequestInput } from "./validations";

const SESSION_COOKIE = "sdh_sid";
const SESSION_MAX_AGE = 60 * 30; // 30 minutes

/** Server-side Supabase client using only the publishable key. */
function serverClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

/**
 * Privacy-preserving visitor fingerprint. The raw IP address is never stored or
 * returned — only an irreversible salted hash of it.
 */
function visitorHash() {
  const forwarded =
    getRequestHeader("cf-connecting-ip") ?? getRequestIP({ xForwardedFor: true }) ?? "";
  const salt = process.env["SUPABASE_URL"] ?? "sd-digital-hub";
  return createHash("sha256").update(`${salt}:${forwarded}`).digest("hex");
}

export type SubmitResult =
  { ok: true } | { ok: false; reason: "rate_limited" | "invalid" | "failed" };

export const submitRequest = createServerFn({ method: "POST" })
  .inputValidator((data: RequestInput) => requestSchema.parse(data))
  .handler(async ({ data }): Promise<SubmitResult> => {
    const supabase = serverClient();
    const { error } = await supabase.rpc("submit_website_request", {
      p_kind: data.kind,
      p_name: data.name,
      p_email: data.email,
      p_phone: data.phone,
      p_business_name: data.businessName || null,
      p_details: data.details || null,
      p_service_name: data.serviceName || null,
      p_ip_hash: visitorHash(),
    });

    if (error) {
      // Never surface raw database errors to the browser.
      console.error("submit_website_request failed", error.message);
      if (error.message.includes("rate_limited")) return { ok: false, reason: "rate_limited" };
      if (error.message.includes("invalid_request")) return { ok: false, reason: "invalid" };
      return { ok: false, reason: "failed" };
    }

    return { ok: true };
  });

/**
 * Creates or refreshes the visitor's session. At most 3 concurrent sessions per
 * network address are allowed; expired sessions do not count.
 */
export const touchSession = createServerFn({ method: "POST" }).handler(async () => {
  let sessionId = getCookie(SESSION_COOKIE);
  if (!sessionId || !/^[a-f0-9]{32}$/.test(sessionId)) {
    sessionId = randomBytes(16).toString("hex");
  }

  setCookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  const supabase = serverClient();
  const { data, error } = await supabase.rpc("touch_website_session", {
    p_session_id: sessionId,
    p_ip_hash: visitorHash(),
    p_user_agent: getRequestHeader("user-agent") ?? null,
  });

  if (error) {
    console.error("touch_website_session failed", error.message);
    return { allowed: true };
  }

  return { allowed: data !== false };
});
