import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function FormDialog({
  title,
  description,
  submitLabel = "Submit",
  isOpen,
  onOpenChange,
  onSubmit,
  defaultName = "",
}: {
  title: string;
  description: string;
  submitLabel?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string }) => void;
  defaultName?: string;
}) {
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  useEffect(() => {
    if (isOpen) {
      reset({ name: defaultName });
    }
  }, [isOpen, defaultName, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
          className="space-y-4"
        >
          <input
            {...register("name", { required: true })}
            className="w-full border px-3 py-2"
            placeholder="Category name"
          />
          <DialogFooter className="flex justify-end gap-2">
            <Button type="submit">{submitLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
