import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

interface ContainerInterface {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerInterface) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="w-full flex-grow px-10 py-5 bg-gradient-to-b from-darkBlue to-lightBlue text-white">
        {children}
      </section>
      <Footer>Todos os direitos Reservados</Footer>
    </div>
  );
};
