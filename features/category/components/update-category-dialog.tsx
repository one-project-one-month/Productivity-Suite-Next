"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CategorySchema, TCategorySchema } from "@/database/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Edit, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import CategoryFormBody from "./category-form-body";
import { Category } from "@/database/interfaces.types";
import { updateCategory } from "@/features/category/actions/update-category";
import { toast } from "sonner";
import DeleteCategoryBtn from "@/features/category/components/delete-category-btn";

const UpdateCategoryDialog = ({
  defaultValues,
  className,
}: {
  defaultValues: Category;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<TCategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const router = useRouter();
  const isDirty = Object.keys(form.formState.dirtyFields).length > 0;
  const onSubmit = async (data: TCategorySchema) => {
    const { success, message } = await updateCategory({
      id: defaultValues.id,
      userId: defaultValues.userId,
      ...data,
    });
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
      <DialogTrigger asChild={true} className={className}>
        <Button variant={"outline"}>
          <Edit />
          <span className={"sr-only"}>Update Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Create new category suitable for your use cases.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CategoryFormBody control={form.control} />
            <DialogFooter className={"mt-4"}>
              <DialogClose asChild={true}>
                <Button variant={"outline"} className={"mr-auto"}>
                  Cancel
                </Button>
              </DialogClose>
              <DeleteCategoryBtn id={defaultValues.id} />
              <Button
                type={"submit"}
                disabled={
                  form.formState.isSubmitting ||
                  !form.formState.isValid ||
                  !isDirty
                }
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className={"mr-2 inline-block animate-spin"} />
                    <span>Updating</span>
                  </>
                ) : (
                  <>
                    <Save />
                    <span>Update</span>
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

export default UpdateCategoryDialog;
