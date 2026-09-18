import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";
import { submitRequest } from "@/lib/requests.functions";
import { formSchema } from "@/lib/validations";

type Kind = "service" | "contact" | "callback";

const successMessages: Record<Kind, string> = {
  contact:
    "Your contact request has been successfully received. Within 24 hours, a team member will get in touch with you.",
  callback:
    "Callback request submitted successfully. Within 24 hours, a team member will get in touch with you.",
  service:
    "Your service request has been successfully received. Within 24 hours, a team member will get in touch with you.",
};

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "businessName" | "details", string>>;

export function RequestForm({
  kind,
  serviceName,
  submitLabel,
  detailsLabel = "Additional details",
}: {
  kind: Kind;
  serviceName?: string;
  submitLabel: string;
  detailsLabel?: string;
}) {
  const send = useServerFn(submitRequest);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = formSchema.safeParse(raw);

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const result = await send({ data: { ...parsed.data, kind, serviceName: serviceName ?? "" } });

      if (!result.ok) {
        setStatus("idle");
        setFormError(
          result.reason === "rate_limited"
            ? "You have sent several requests recently. Please try again a little later or call us directly."
            : "We could not submit your request just now. Please try again, or contact us by phone or email.",
        );
        return;
      }

      setStatus("done");

      // WhatsApp only opens after the request was stored successfully.
      if (kind === "service") {
        const message = [
          `New service request from ${site.url}`,
          `Service: ${serviceName ?? "-"}`,
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Phone: ${parsed.data.phone}`,
          `Business: ${parsed.data.businessName || "-"}`,
          `Details: ${parsed.data.details || "-"}`,
        ].join("\n");
        window.open(
          `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener,noreferrer",
        );
      }

      form.reset();
    } catch {
      setStatus("idle");
      setFormError("Something went wrong while submitting. Please try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-lg border border-border bg-surface p-5 text-sm text-secondary-foreground"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p>{successMessages[kind]}</p>
          <Button variant="link" className="mt-1 h-auto p-0" onClick={() => setStatus("idle")}>
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${kind}-name`}
          name="name"
          label="Name"
          required
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id={`${kind}-email`}
          name="email"
          label="Email"
          type="email"
          required
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id={`${kind}-phone`}
          name="phone"
          label="Phone"
          type="tel"
          required
          error={errors.phone}
          autoComplete="tel"
        />
        <Field
          id={`${kind}-business`}
          name="businessName"
          label="Business name"
          error={errors.businessName}
          autoComplete="organization"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${kind}-details`}>{detailsLabel}</Label>
        <Textarea
          id={`${kind}-details`}
          name="details"
          rows={4}
          maxLength={2000}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? `${kind}-details-error` : undefined}
          className="bg-surface"
        />
        {errors.details ? (
          <p id={`${kind}-details-error`} className="text-sm text-destructive">
            {errors.details}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          submitLabel
        )}
      </Button>
      <p className="text-xs text-subtle">
        We use these details only to respond to your request. See our{" "}
        <a href="/privacy-policy" className="underline hover:text-secondary-foreground">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string | undefined;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={200}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="bg-surface"
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
