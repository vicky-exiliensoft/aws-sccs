import React, { ReactElement, ReactNode } from "react";
import { Button, ButtonProps } from "react-bootstrap";

interface CustomButtonProps extends ButtonProps {
  buttonAs?: "a" | "button";
  className?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const { variant, size, children, buttonAs, className } = props;
  return (
    <>
      <Button variant={variant} size={size} as={buttonAs ?? "button"} className={className}>
        {children}
      </Button>
    </>
  );
};

export default CustomButton;
