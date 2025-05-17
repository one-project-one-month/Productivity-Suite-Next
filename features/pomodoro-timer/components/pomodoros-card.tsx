interface PomodoroCardProps {
  id: string;
  category: string;
  description: string;
  onDelete: (id: string) => void;
}

const PomodoroCard = ({
  id,
  category,
  description,
  onDelete,
}: PomodoroCardProps) => {
  return (
    <div className="border rounded-lg p-4 mb-2 bg-white/5 hover:bg-white/10 transition-all duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* <span className="text-sm text-gray-400">#{id}</span> */}
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium px-3 py-1 border rounded-full bg-transparent border-green-400 text-green-400">
              {category}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500 w-4 h-4"
              >
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM3 5.5C3 5.22386 3.22386 5 3.5 5H11.5C11.7761 5 12 5.22386 12 5.5C12 5.77614 11.7761 6 11.5 6H3.5C3.22386 6 3 5.77614 3 5.5ZM3.5 7C3.22386 7 3 7.22386 3 7.5C3 7.77614 3.22386 8 3.5 8H11.5C11.7761 8 12 7.77614 12 7.5C12 7.22386 11.7761 7 11.5 7H3.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroCard;
