"use client";
import { useState } from "react";
import CardData from "./card";
import CardDataMobile from "./card-mobile";

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
    mobileDescription: "use time management tool",
    link: "pomodoro-timer",
  },
  {
    title: "Todo",
    image: "/landingPageImage/todo.png",
    description:
      "Organize your daily tasks, set deadlines, and track your productivity.",
    mobileDescription: "organize your daily tasks",
    link: "to-do",
  },
  {
    title: "Notes",
    image: "/landingPageImage/notes.png",
    description:
      "Quickly jot down your thoughts and keep your ideas organized.",
    mobileDescription: "keep your ideas organized.",
    link: "notes",
  },
  {
    title: "Budget Tracker",
    image: "/landingPageImage/budgetTracker.png",
    description:
      "A tool that helps you monitor your income, expenses, and savings in real-time and categorizes spending to show where your money goes.",
    mobileDescription: "To monitor income, expenses and savings",
    link: "budget-tracker/overview",
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
      id="tools"
      className={`w-full min-h-dvh mb-36 md:mb-0 md:mt-14 flex flex-col items-center justify-center px-6 py-10 transition-all duration-500 !bg-muted bg-cover bg-center`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundColor: hoveredIndex !== null ? "rgba(0,0,0,0.3)" : "black",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* mobile card :3 */}
      <div className="grid p-4 grid-cols-1 md:hidden place-items-center gap-6 w-full max-w-7xl">
        {cards.map((card, index) => (
          <div key={index} className="relative">
            <CardDataMobile
              cardTitle={card.title}
              image={card.image}
              mobileDescription={card.mobileDescription}
              link={card.link}
            />
          </div>
        ))}
      </div>

      {/* desktop card :3 */}
      <div className="hidden md:grid md:grid-cols-4 items-center justify-center gap-6 w-full max-w-7xl">
        {cards.map((card, index) => (
          <div key={index} className="relative">
            <CardData
              cardTitle={card.title}
              image={card.image}
              isHovered={hoveredIndex === index}
              isDimmed={hoveredIndex !== null && hoveredIndex !== index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              link={card.link}
            />

            {hoveredIndex === index && (
              <div
                className={`md:absolute top-0 transition-all duration-500 ease-in-out delay-200 
                ${index === 0 || index === 1 ? "left-full" : "right-full mr-10"} 
                min-h-full w-sm lg:w-xl text-foreground p-6 rounded-xl
                flex items-center justify-center md:opacity-100 opacity-0`}
              >
                <div className="text-center backdrop-blur-md bg-foreground/10 border border-foreground/30 rounded-xl p-4">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-base text-foreground">
                    {card.description}
                  </p>
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
