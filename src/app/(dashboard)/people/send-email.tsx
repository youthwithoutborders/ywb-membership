import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Content } from "@tiptap/react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { MinimalTiptapEditor } from "~/app/_components/minimal-tiptap";
import { Button } from "~/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { api } from "~/trpc/react";
import { gmailDraftSchema } from "~/validators/gmail";

interface SendEmailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SendEmail({ open, setOpen }: SendEmailProps) {
  const form = useForm<z.infer<typeof gmailDraftSchema>>({
    resolver: zodResolver(gmailDraftSchema),
    defaultValues: {
      subject: "",
      body: "",
    },
  });

  const [body, setBody] = useState<Content>([]);

  useEffect(() => {
    if (open === false) form.reset();
  }, [form, open]);

  const utils = api.useUtils();
  const mutation = api.gmail.createDraft.useMutation({
    onError: (_, input) => {
      toast.error("An error occurred while sending the email.");
    },
    onSuccess(data) {
      void utils.person.all.invalidate();
      setOpen(false);
      toast.success("Successfully sent the email.");
    },
  });

  function onSubmit(values: z.infer<typeof gmailDraftSchema>) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Send Email</DialogTitle>
              <DialogDescription>
                Send an email to the selected people.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="people"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>People</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <MinimalTiptapEditor
                value={body}
                onChange={setBody}
                className="w-full"
                editorContentClassName="p-5"
                output="html"
                placeholder="Type your description here..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-none"
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Email
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
