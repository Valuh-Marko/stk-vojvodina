import React from "react";
import { MdDoubleArrow } from "react-icons/md";
import "./button.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "standard" | "small";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "standard",
  children,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`button button--${variant} button--${size} ${className}`}
      onClick={onClick}
    >
      {children} <MdDoubleArrow className="button__icon" />
    </button>
  );
};
