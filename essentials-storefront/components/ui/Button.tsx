import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "yellow" | "outline" | "default";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  let baseStyle = "w-full inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer select-none active:scale-[0.98]";
  
  let variantStyle = "";
  if (variant === "yellow") {
    variantStyle = "bg-gag-yellow text-gag-black hover:bg-white hover:text-gag-black";
  } else if (variant === "outline") {
    variantStyle = "bg-transparent text-gag-white border border-gag-white/20 hover:border-gag-yellow hover:text-gag-yellow";
  } else {
    variantStyle = "bg-gag-white text-gag-black hover:bg-gag-yellow hover:text-gag-black";
  }

  let sizeStyle = "";
  if (size === "sm") {
    sizeStyle = "py-2 px-4 text-xs";
  } else if (size === "lg") {
    sizeStyle = "py-4 px-8 text-sm";
  } else {
    sizeStyle = "py-3 px-6 text-sm";
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
