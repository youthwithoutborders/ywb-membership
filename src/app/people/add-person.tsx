"use client";

import { Button } from "~/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/_components/ui/dialog";
import { Input } from "~/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { personCreateSchema } from "~/validators/person";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { Combobox } from "~/app/_components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { DatePicker } from "~/app/_components/ui/date-picker";
import { PhoneInput } from "~/app/_components/ui/phone-input";
import { api } from "~/trpc/react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState } from "react";

const formSchema = personCreateSchema
  .extend({
    mononym: z.boolean(),
  })
  .transform((data) => ({
    ...data,
    lastName: data.mononym ? null : data.lastName,
  }))
  .refine(
    (data) =>
      (!data.mononym && data.lastName !== null) ||
      (data.mononym && data.lastName === null),
    {
      message: 'This is required unless "Is Single Name" is checked.',
      path: ["lastName"],
    },
  );

export function AddPerson() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mononym: false,
      preferredFirstName: "",
      pronouns: "",
      gender: undefined,
      dateOfBirth: "",
      phone: "",
      personalEmail: "",
      universityEmail: "",
      companyEmail: "",
      address: "",
    },
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open === false) form.reset();
  }, [form, open]);

  const mutation = api.person.create.useMutation({
    onError: (_, input) => {
      toast.error(
        `An error occurred while adding ${input.preferredFirstName ?? input.firstName}.`,
      );
    },
    onSuccess(data) {
      setOpen(false);
      toast.success(
        `Successfully added ${data.preferredFirstName ?? data.firstName}.`,
        {
          action: (
            <Button variant="link" asChild>
              <Link href={`/people/${data.id}`} className="ms-auto">
                View person
              </Link>
            </Button>
          ),
        },
      );
    },
  });

  function onSubmit(values: z.infer<typeof personCreateSchema>) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Person</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add Person</DialogTitle>
              <DialogDescription>
                Add a person to the database here. If they have been involved
                with YWB in the past, please check if they are already in the
                system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">First Name*</FormLabel>
                    <FormControl className="col-span-3">
                      <Input placeholder="Jonathan" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mononym"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Is Single Name</FormLabel>
                    <FormControl className="col-span-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription className="col-span-3 col-start-2">
                      Select this if they only have one name, like Madonna.
                    </FormDescription>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredFirstName"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">
                      Preferred First Name
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        placeholder="John"
                        value={value ?? ""}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="col-span-3 col-start-2">
                      Add this if they commonly go by a different name to their
                      legal one. This isn&apos;t a nickname.
                    </FormDescription>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              {!form.getValues().mononym && (
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field: { value, ...field } }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                      <FormLabel className="text-right">Last Name*</FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          placeholder="Smith"
                          value={value ?? ""}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-3 col-start-2" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Gender*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                    >
                      <FormControl className="col-span-3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="GENDER_DIVERSE">
                          Gender Diverse
                        </SelectItem>
                        <SelectItem value="PREFER_NOT_TO_SAY">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pronouns"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Pronouns</FormLabel>
                    <div className="col-span-3">
                      <Combobox
                        placeholder="Select pronouns"
                        selectPlaceholder="Select pronouns..."
                        recommendations={["He/Him", "She/Her", "They/Them"]}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </div>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Date of Birth</FormLabel>
                    <div className="col-span-3">
                      <DatePicker
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      />
                    </div>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Phone</FormLabel>
                    <div className="col-span-3">
                      <PhoneInput
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        placeholder="Enter a phone number"
                      />
                    </div>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="personalEmail"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Personal Email</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        placeholder="john.smith@gmail.com"
                        value={value ?? ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="universityEmail"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">
                      University Email
                    </FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        placeholder="jsmi123@aucklanduni.ac.nz"
                        value={value ?? ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Company Email</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        placeholder="john.smith@ywb.co.nz"
                        value={value ?? ""}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="col-span-3 col-start-2">
                      Don&apos;t add an email that belongs to a role, such as
                      coordinator@ignite.ywb.co.nz.
                    </FormDescription>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2 space-y-0">
                    <FormLabel className="text-right">Address</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        placeholder="21 Symonds Street, Auckland CBD, Auckland 1010"
                        value={value ?? ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-2" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Person
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
