import React from "react";

interface CustomButtonProps {
  icon?: React.ReactNode; 
  title: string | number; 
  bgColor?: string; 
  textColor?: string; 
  className?: string; 
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  icon,
  title,
  bgColor = "bg-red-500",
  textColor = "text-white", 
  className = "",
  onClick,
  type,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColor} ${textColor} font-bold py-2 px-4 rounded text-sm flex items-center justify-center transition-all hover:opacity-90 ${className}`}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{title}</span>
    </button>
  );
};

export default Button;
