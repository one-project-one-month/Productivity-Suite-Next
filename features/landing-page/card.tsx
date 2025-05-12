"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

type CardType = {
  cardTitle: string;
  image: string;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

const CardData = ({
  cardTitle,
  image,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: CardType) => {
  return (
    <motion.div
      className={`relative md:w-full w-[340px] sm:max-w-sm md:max-w-md h-80 sm:h-96 rounded-xl overflow-hidden transition-opacity duration-300 ${
        isDimmed ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart} // simulate hover on touch
      onTouchEnd={onHoverEnd}
    >
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full h-full"
      >
        <Button
          onClick={() => console.log(cardTitle)}
          className="w-full h-full cursor-pointer bg-transparent z-10 p-0"
        >
          <Card className="relative w-full h-full overflow-hidden">
            {/* Image with blur effect on hover */}
            <motion.div
              initial={{ filter: "blur(0px)" }}
              animate={{ filter: isHovered ? "blur(4px)" : "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 z-0 ${isHovered ? "border-4 border-gray-400" : ""}`}
            >
              <Image
                src={image}
                alt={cardTitle}
                className="w-full h-full object-cover"
                width={400}
                height={400}
              />
            </motion.div>

            <div className="absolute inset-0 bg-opacity-10 z-10" />

            {/* Title shown only on non-hover */}
            <CardHeader className="relative z-20">
              <CardTitle
                className={`text-center text-xl sm:text-2xl font-semibold text-orange transition-opacity duration-200 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* {cardTitle} */}
              </CardTitle>
            </CardHeader>

            {/* Hover text shown on hover */}
            <CardContent className="relative z-20 flex items-center justify-center h-full">
              <span
                className={`text-black text-base sm:text-lg font-medium text-center transition-opacity duration-200 px-2 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                Use {cardTitle}
              </span>
            </CardContent>
          </Card>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CardData;
