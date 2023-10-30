"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"


import { toast } from "@/components/ui/use-toast"

import { FieldErrors, useForm } from "react-hook-form"

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { ComboboxDemo } from "./commandMenu";

const FormSchema = z.object({
  name: z.string().min(2).max(500),
  country: z.string().min(2).max(500),
  local: z.string().min(2).max(500),
  type: z.string().min(2).max(500),
  alternate: z.optional(z.string().min(2).max(500)),
})

export default function Home() {
  const products = useQuery(api.products.get);
  const addProduct = useMutation(api.products.add);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <main className="p-24">
      {products?.map(({ _id, name }) => (
        <div key={_id}>{name}</div>
      ))}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name. e.g. McDondals" {...field} />
                </FormControl>
                <FormDescription>
                  Write the name of the product that should be boycotted
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Name</FormLabel>
                <FormControl>
                  <ComboboxDemo onChange={(value: string) => {
                  console.log(value)
                  form.setValue("country", value)
                }} />
                </FormControl>
                <FormDescription>
                  Write the name of the country from which the product originates from
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>
        <Errors errors={form.formState.errors} />
        <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
      </div>
    </main>
  );
}

const Errors = ({ errors }: { errors: FieldErrors<{
  name: string;
  country: string;
  local: string;
  type: string;
  alternate?: string | undefined;
}>}) => {
  const keys = Object.keys(errors);
  if (keys.length === 0) {
    return null;
  }
  return (
    <div>
      {keys.map((key) => {
        // @ts-ignore
        const error = errors[key];
        return (
          <div key={key}>
            {key}: {error.message}
          </div>
        );
      })}   
    </div>
  );
}