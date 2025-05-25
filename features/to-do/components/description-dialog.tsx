import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type DescriptionDialogProps = {
  title: string;
  description?: string;
};

export const DescriptionDialog = ({
  title,
  description,
}: DescriptionDialogProps) => (
  <Dialog>
    <DialogTrigger className="underline text-blue-600">
      View Details
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Title - <p className="text-lg text-blue-400 inline">{title}</p>
        </DialogTitle>
      </DialogHeader>
      {description ? (
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg mr-1">Desctiption</p>
          <p className="ml-1 text-sm text-justify"> - {description}</p>
        </div>
      ) : (
        <p className="italic text-red-300">
          There is no description for this todo
        </p>
      )}
    </DialogContent>
  </Dialog>
);
