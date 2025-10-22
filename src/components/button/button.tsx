import React from "react";
import "./button.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "standard" | "small";
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "standard",
  children,
  onClick,
}) => {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
