"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Word animation generator
const wordAnimation = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delay + i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
});

// Animated word component triggered on scroll into view
const AnimatedWords = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordAnimation(delay)}
          className="inline-block text-4xl md:text-8xl font-bold tracking-wide mt-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function HeroSection() {
  return (
    <div className="flex flex-row justify-center items-center md:h-[600px] h-64 mt-10 relative">
      <div className="flex flex-col justify-center items-center text-center">
        <AnimatedWords text="Organize Your Mind &" delay={0.3} />
        <AnimatedWords text="Manage Your  Grind " delay={1.4} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="flex gap-4 md:mt-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-center sm:items-center mt-8 px-4">
            <Link href="/#tools">
              <Button className="w-full sm:w-auto border border-gray-300 bg-transparent px-4 py-4 text-foreground hover:bg-transparent cursor-pointer hover:text-muted-foreground text-center">
                Check Productivity Tools
              </Button>
            </Link>

            <Button className="w-full sm:w-auto relative items-center justify-center inline-flex px-5 py-4 overflow-hidden font-medium cursor-pointer text-indigo-600 rounded-lg shadow-2xl group">
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white text-center">
                It is free, Start Now!
              </span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* bg gradient blob */}
      <div className="absolute inset-0 z-[-1] blur-3xl opacity-10">
        <div className="blob bg-foreground w-full h-full" />
      </div>
    </div>
  );
}
