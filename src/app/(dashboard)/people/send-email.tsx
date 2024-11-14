import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type HTMLContent } from "@tiptap/react";
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
import MultipleSelector from "~/app/_components/ui/multiple-selector";
import { Skeleton } from "~/app/_components/ui/skeleton";
import { getPreferredFullName } from "~/app/_lib/people";
import { api } from "~/trpc/react";
import { gmailDraftSchema } from "~/validators/gmail";

interface SendEmailProps {
  selectedPeople: number[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SendEmail({ selectedPeople, open, setOpen }: SendEmailProps) {
  const people = api.person.all.useQuery();

  const form = useForm<z.infer<typeof gmailDraftSchema>>({
    resolver: zodResolver(gmailDraftSchema),
    defaultValues: {
      people: [],
      subject: "",
      body: "",
    },
  });

  useEffect(() => {
    form.setValue("people", selectedPeople);
  }, [form, selectedPeople]);

  useEffect(() => {
    if (open === false) form.reset();
  }, [form, open]);

  const utils = api.useUtils();
  const mutation = api.gmail.createDraft.useMutation({
    onError: () => {
      toast.error("An error occurred while sending the email.");
    },
    onSuccess() {
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[750px]">
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

                    {people.isPending && <Skeleton className="h-10" />}

                    {people.isSuccess && (
                      <FormControl>
                        <MultipleSelector
                          loadingIndicator
                          value={field.value.map((v) => ({
                            label: getPreferredFullName(
                              people.data.find((person) => person.id === v)!,
                            ),
                            value: v.toString(),
                          }))}
                          onChange={(value) =>
                            form.setValue(
                              "people",
                              value.map((v) => parseInt(v.value, 10)),
                            )
                          }
                          defaultOptions={people.data.map((person) => ({
                            label: getPreferredFullName(person),
                            value: person.id.toString(),
                          }))}
                          placeholder="Select people..."
                          emptyIndicator={
                            <p className="py-6 text-center text-sm">
                              No people found.
                            </p>
                          }
                        />
                      </FormControl>
                    )}
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

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        value={field.value}
                        onChange={(value) =>
                          form.setValue("body", value as HTMLContent)
                        }
                        className="w-full"
                        editorContentClassName="p-2"
                        output="html"
                        placeholder="Enter message..."
                        autofocus={true}
                        editable={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <MinimalTiptapEditor
                value={body}
                onChange={setBody}
                className="w-full"
                editorContentClassName="p-2"
                output="html"
                placeholder="Enter message..."
                autofocus={true}
                editable={true}
              /> */}
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
