interface PomodoroCardProps {
  content: string;
  id: number;
}

const PomodoroCard = ({ content, id }: PomodoroCardProps) => {
  return (
    <div className="border rounded-lg p-4 mb-2 bg-white/5 hover:bg-white/10">
      <h3 className="text-lg font-medium">Task {id}</h3>
      <p className="text-sm text-gray-400">{content}</p>
    </div>
  );
};

export default PomodoroCard;
