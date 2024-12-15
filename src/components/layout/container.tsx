import React from "react"

interface ContainerInterface {
    children: React.ReactNode
}

export const Container = ({children}: ContainerInterface) => {
    return(
        <section className="px-96 py-6">
            {children}
        </section>
    )
}