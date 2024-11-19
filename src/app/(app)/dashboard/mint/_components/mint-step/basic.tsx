"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useMintOneContext } from "@/contexts/mint-one";
import { toast } from "@/hooks/use-toast";

const nftFormSchema = z.object({
  assetName: z
    .string()
    .min(6, {
      message: "Name must be at least 6 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  assetQuantity: z.string().refine(
    (val) => {
      const parsedValue = parseInt(val, 10);
      return !Number.isNaN(parsedValue) && parsedValue > 0;
    },
    {
      message: "Invalid value",
    },
  ),
});

type NftFormValues = z.infer<typeof nftFormSchema>;

export default function BasicStep() {
  const { stepper, basicInfoToMint, setBasicInfoToMint } = useMintOneContext();

  const defaultValues: Partial<NftFormValues> = {
    assetQuantity: basicInfoToMint.quantity,
    assetName: basicInfoToMint.assetName,
  };

  const form = useForm<NftFormValues>({
    resolver: zodResolver(nftFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: NftFormValues) {
    try {
      if (!(parseInt(data.assetQuantity || "0", 10) > 0)) {
        throw new Error("Invalid quantity");
      }
      if (data.assetName.length < 2) {
        throw new Error("Name must be at least 2 characters.");
      }
      setBasicInfoToMint({
        assetName: data.assetName,
        quantity: data.assetQuantity,
      });
      stepper.next();
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "unknown error",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-8 px-10 m-auto flex flex-col">
          <div className="rounded-md border border-dashed">
            <div className="space-y-8">
              <div className="relative flex-col items-center justify-center">
                <div className="lg:p-8">
                  <div className="mx-auto flex w-full flex-col  space-y-6">
                    <div className="flex flex-col space-y-2 text-left">
                      <h1 className="text-2xl font-semibold tracking-tight">
                        Basic Information
                      </h1>
                    </div>
                    <div className="space-y-6">
                      <div className="border-none p-0 outline-none gap-2">
                        <FormField
                          control={form.control}
                          name="assetName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Asset Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter a Name" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="assetQuantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Asset Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
