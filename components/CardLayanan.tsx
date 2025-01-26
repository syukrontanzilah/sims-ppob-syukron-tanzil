/* eslint-disable react/display-name */
import Image from "next/image";
import React from "react";

interface CardLayananProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const CardLayanan: React.FC<CardLayananProps> = React.memo(({ title, image, onClick }) => {
  return (
    <div onClick={onClick} className="w-[60px] cursor-pointer">
      <div>
        <Image
          alt={title}
          src={image}
          height={60}
          width={60}
          className="rounded-sm"
        />
      </div>
      <div className="flex items-center justify-center text-[11px] font-bold text-slate-400 mt-2 text-center">
        <h4>{title}</h4>
      </div>
    </div>
  );
});

export default CardLayanan;
