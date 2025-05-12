import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
type DescriptionDialogProps = {
    title: string
    description: string
}

export const DescriptionDialog = ({ title, description }: DescriptionDialogProps) => (
    <Dialog>
        <DialogTrigger className="underline text-blue-600">View Details</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Description for <p className="text-blue-400 inline">{title}</p></DialogTitle>
            </DialogHeader>
            {description ? <p> - {description}</p> : <p className="italic text-red-300">There is no description for this task</p>}
        </DialogContent>
    </Dialog>
);
