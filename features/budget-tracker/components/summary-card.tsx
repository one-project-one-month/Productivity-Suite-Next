type SummaryCardProps = {
  title: string;
  data: string;
  description: string;
};
const SummaryCard = ({ title, data, description }: SummaryCardProps) => {
  return (
    <div className={"p-6  border rounded-xl shadow-md"}>
      <h2 className={"font-semibold"}>{title}</h2>
      <p className={"text-3xl font-bold"}>{data}</p>
      <p className={"text-sm font-semibold text-gray-400"}>{description}</p>
    </div>
  );
};

export default SummaryCard;
