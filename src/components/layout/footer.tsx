import React from "react"

interface FooterInterface {
    children: React.ReactNode
}

export const Footer = ({children}: FooterInterface) => {
    return(
        <footer className="text-center my-6 bg-white text-gray font-bold text-3xl ">{children}</footer>
    )
}