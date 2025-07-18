import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface AddWorkBreakSessionProps {
  steps: { type: "work" | "break"; duration: number | null }[];
  setSteps: React.Dispatch<
    React.SetStateAction<{ type: "work" | "break"; duration: number | null }[]>
  >;
  addStep: () => void;
}

const AddWorkBreakSession = ({
  steps,
  setSteps,
  addStep,
}: AddWorkBreakSessionProps) => {
  return (
    <div className="space-y-4 ">
      {Array.from({ length: Math.ceil(steps.length / 2) }).map(
        (_, pairIndex) => {
          const workStep = steps[pairIndex * 2];
          const breakStep = steps[pairIndex * 2 + 1];

          return (
            <div key={pairIndex} className="flex gap-2 items-center">
              {/* Work Step */}
              {workStep && (
                <div className="space-y-1">
                  <Label>Work</Label>
                  <Select
                    value={workStep.duration?.toString() || ""}
                    onValueChange={(value) => {
                      const updated = [...steps];
                      updated[pairIndex * 2].duration = parseInt(value);
                      setSteps(updated);
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[15, 20, 25, 30, 45, 60].map((val) => (
                        <SelectItem key={val} value={val.toString()}>
                          {val} min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Break Step */}
              {breakStep && (
                <div className="space-y-1">
                  <Label>Break</Label>
                  <Select
                    value={breakStep.duration?.toString() || ""}
                    onValueChange={(value) => {
                      const updated = [...steps];
                      updated[pairIndex * 2 + 1].duration = parseInt(value);
                      setSteps(updated);
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[3, 5, 10, 15, 20].map((val) => (
                        <SelectItem key={val} value={val.toString()}>
                          {val} min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => {
                  setSteps((prev) => {
                    if (prev.length <= 2) return prev;

                    // Delete current break + next work step
                    const removeIndices = [pairIndex, pairIndex + 1];
                    // Filter out steps by index
                    return prev.filter(
                      (_, index) => !removeIndices.includes(index),
                    );
                  });
                }}
                title="Remove step pair"
                className="self-end mb-1"
                disabled={steps.length <= 2}
              >
                <X />
              </Button>
            </div>
          );
        },
      )}

      <Button type="button" variant="secondary" onClick={addStep}>
        Add New Step
      </Button>
    </div>
  );
};

export default AddWorkBreakSession;
