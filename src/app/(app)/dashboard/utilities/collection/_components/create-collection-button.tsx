"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createCollection } from "@/services/database/collection";
import { useCollectionContext } from "@/contexts/collection";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

export function CreateCollectionButton() {
  const { createNewDialogOpen, toggleCreateNewDialogOpen } =
    useCollectionContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const { result, message } = await createCollection(values);
    if (result) {
      toast({ title: "Success", description: message });
      form.reset();
      toggleCreateNewDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => toggleCreateNewDialogOpen(true)}
        className="bg-orange-500 text-white hover:bg-orange-600"
      >
        Create New
      </Button>
      <Dialog
        open={createNewDialogOpen}
        onOpenChange={toggleCreateNewDialogOpen}
      >
        <DialogContent className="bg-card">
          <DialogTitle>Create New Collection</DialogTitle>

          <div className="w-full max-w-md rounded-l p-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8 max-w-3xl mx-auto"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Collection Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Description..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
