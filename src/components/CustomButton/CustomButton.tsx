import React from "react";
import "./CustomButton.css"; // Importamos el CSS

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  shadowSize?: "none" | "small" | "medium" | "large";
  rounded?: "none" | "small" | "medium" | "large" | "full";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  shadowSize = "medium",
  rounded = "medium",
  fullWidth = false,
  className = "",
  ...props
}) => {
  // Generamos clases dinámicas basadas en las props
  const buttonClasses = [
    "button",
    `button--${variant}`,
    `button--shadow-${shadowSize}`,
    `button--rounded-${rounded}`,
    fullWidth ? "button--full-width" : "",
    className,
  ].join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
