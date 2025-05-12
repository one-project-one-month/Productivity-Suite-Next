"use client";
import { useState } from "react";
import CardData from "./card";

const sectionBackgrounds = [
  { index: 0, image: "/landingPageImage/pomodoro-wallpaper.png" },
  { index: 1, image: "/landingPageImage/todo-wallpaper.png" },
  { index: 2, image: "/landingPageImage/notes-wallpaper.png" },
  { index: 3, image: "/landingPageImage/budget-wallpaper.png" },
];

const cards = [
  {
    title: "Pomodoro",
    image: "/landingPageImage/pomodoro.png",
    description:
      "A Pomodoro Timer is a time management tool that breaks work into focused intervals, typically 25 minutes long, separated by short breaks.",
  },
  {
    title: "Todo",
    image: "/landingPageImage/todo.png",
    description:
      "Organize your daily tasks, set deadlines, and track your productivity.",
  },
  {
    title: "Notes",
    image: "/landingPageImage/notes.png",
    description:
      "Quickly jot down your thoughts and keep your ideas organized.",
  },
  {
    title: "Budget Tracker",
    image: "/landingPageImage/budgetTracker.png",
    description:
      "A tool that helps you monitor your income, expenses, and savings in real-time and categorizes spending to show where your money goes.",
  },
];

const CardSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  //show images based on the hover image
  const backgroundImage =
    hoveredIndex !== null
      ? sectionBackgrounds.find((item) => item.index === hoveredIndex)?.image
      : null;

  return (
    <section
      className={`w-full min-h-screen mt-14 flex flex-col items-center justify-center px-6 py-16 transition-all duration-500 bg-black bg-cover bg-center`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundColor: hoveredIndex !== null ? "rgba(0,0,0,0.3)" : "black",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="md:grid md:grid-cols-4 flex flex-col items-center justify-center gap-6 w-full max-w-7xl">
        {cards.map((card, index) => (
          <div key={index} className="relative">
            <CardData
              cardTitle={card.title}
              image={card.image}
              isHovered={hoveredIndex === index}
              isDimmed={hoveredIndex !== null && hoveredIndex !== index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />

            {hoveredIndex === index && (
              <div
                className={`absolute top-0 transition-all duration-500 ease-in-out delay-200 
                ${index === 0 || index === 1 ? "left-full" : "right-full mr-10"} 
                w-max min-h-80  text-white p-6 rounded-xl
                flex items-center justify-center md:opacity-100 opacity-0`}
              >
                <div className="text-center backdrop-blur-md bg-white/10 border border-white/30 rounded-xl p-4">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {card.title}
                  </h3>
                  <p className="text-base text-white">{card.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardSection;
