import { type ReactNode, useState } from "react";

import { RequestForm } from "@/components/forms/RequestForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CallbackDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto border-border bg-background sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request a callback</DialogTitle>
          <DialogDescription>
            Leave your details and a team member will call you back within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <RequestForm
          kind="callback"
          submitLabel="Request callback"
          detailsLabel="What should we discuss?"
        />
      </DialogContent>
    </Dialog>
  );
}
