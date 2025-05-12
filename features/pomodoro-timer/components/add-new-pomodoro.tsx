import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const AddNewPomodoro = () => {
  return (
    <>
      <div className="w-full border-dashed border-2 border-gray-300 rounded-lg  flex items-center justify-between mb-">
        <Dialog>
          <DialogTrigger className="w-full h-full bg-transparent text-lg outline-none text-gray-300 cursor-pointer px-4 py-2">
            Enter New Pomodoro...
          </DialogTrigger>
          <DialogContent>
            <DialogClose></DialogClose>
            <DialogHeader>
              <DialogTitle>Add New Pomodoro here!</DialogTitle>
              <Input placeholder="What are you working for?" />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddNewPomodoro;
