import React from "react";

interface FooterInterface {
  children: React.ReactNode;
}

export const Footer = ({ children }: FooterInterface) => {
  return (
    <footer className="text-center mt-6 p-5 bg-darkBlue text-gray font-bold text-2xl md:text-4xl ">
      {children}
    </footer>
  );
};
