import { Slider } from "@/components/ui/slider";
import { usePomodoro } from "../hooks/usePomodoro";
import { Button } from "@/components/ui/button";

type ViewTimerProps = {
  isEditingTime: boolean;
  setIsEditingTime: (val: boolean) => void;
};

const ViewTimer = ({
  isEditingTime,
  setIsEditingTime,
}: ViewTimerProps) => {
const {
    time,
    setTime,
    pauseTimer,
  } = usePomodoro();

  const editValueHandler = () => {
    setIsEditingTime(!isEditingTime);
    pauseTimer();
  };

  return (
    <div>
      {isEditingTime ? (
        <div className="flex gap-2 items-center flex-col h-40 cursor-pointer relative">
          <div className="flex gap-2 text-3xl font-medium mt-10 select-none z-10">
            <Button className="text-3xl">
              <svg
                width="40"
                height="40"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
              </svg>
            </Button>
            <div onClick={editValueHandler} className="w-20 text-center">
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
              :{(time % 60).toString().padStart(2, "0")}
            </div>
            <Button className="text-3xl">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
              </svg>
            </Button>
          </div>

          <Slider
            value={[time]}
            onValueChange={([val]) => setTime(val)}
            max={3600}
            step={1}
            className="w-48 h-10 z-10"
          />
        </div>
      ) : (
        <div
          onClick={editValueHandler}
          className="text-5xl flex items-center justify-center font-bold h-40 cursor-pointer select-none"
        >
          {Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}
          :{(time % 60).toString().padStart(2, "0")}
        </div>
      )}
    </div>
  );
};

export default ViewTimer;
