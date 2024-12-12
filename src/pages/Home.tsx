export const Home = () => {
  return(
    <body>
    <main className="flex justify-center items-center bg-darkBlue h-screen">
      <div className="w-4/5 h-4/5">
          <div className="w-full h-full rounded-md bg-center bg-hero-pattern bg-cover ">
            <h1 className="text-center text-7xl font-bold text-lightGraay mt-4">Cadastre-se</h1>
            <div className="flex justify-center items-center w-full h-full">
                <form className="border-4 p-10 rounded-md border-gray">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" required />
                </form>
            </div>
          </div>
      </div> 
    </main>
  </body>
  )
};


