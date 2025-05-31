"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { CategorySchema, TCategorySchema } from "@/database/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryFormBody from "@/features/category/components/category-form-body";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Save } from "lucide-react";
import { useState } from "react";
import { createNewCategory } from "@/features/category/actions/create-new-category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<TCategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      color: "",
      name: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<TCategorySchema> = async (data) => {
    const { success, message } = await createNewCategory(data);
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
    router.refresh();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true} className={"w-full"}>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Categories
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create new category suitable for your use cases.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CategoryFormBody control={form.control} />
            <DialogFooter>
              <DialogClose asChild={true}>
                <Button variant={"destructive"}>Cancel</Button>
              </DialogClose>
              <Button
                type={"submit"}
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className={"mr-2 inline-block animate-spin"} />
                    <span>Saving</span>
                  </>
                ) : (
                  <>
                    <Save />
                    <span>Save</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
