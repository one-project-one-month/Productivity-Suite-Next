"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type CardType = {
  cardTitle: string;
  image: string;
  mobileDescription: string;
  link: string;
};

const CardDataMobile = ({
  cardTitle,
  image,
  mobileDescription,
  link,
}: CardType) => {
  return (
    <motion.div
      className={`relative md:w-full w-[340px] sm:max-w-sm md:max-w-md sm:h-96 rounded-xl overflow-hidden transition-opacity duration-300 
      }`}
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
    >
      <Link
        href={`/${link}`}
        className="w-full h-full cursor-pointer bg-transparent z-10 p-0"
      >
        <Card className="group relative w-full h-full overflow-hidden rounded-xl p-4">
          <div className="absolute inset-0 z-0">
            <Image
              src={image}
              alt={cardTitle}
              className="w-full h-full object-cover brightness-50 scale-105 group-hover:scale-100 transition-[scale]"
              width={400}
              height={400}
            />
          </div>

          <div className="absolute inset-0 bg-opacity-10 backdrop-blur-xs group-hover:backdrop-blur-none transition-[backdrop-blur] bg-muted/10 z-10" />

          {/* Title */}
          <CardHeader className="relative z-20">
            <CardTitle className="text-center text-white text-4xl text-shadow-sm text-shadow-black/30 sm:text-2xl font-bold">
              {cardTitle}
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="relative z-20 flex items-center justify-center h-full text-white/70">
            <span className=" text-base sm:text-lg wrap-normal text-center px-2">
              click to {mobileDescription}
            </span>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CardDataMobile;
