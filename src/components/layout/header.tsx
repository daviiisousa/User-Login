import { BookUser } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-darkBlue text-white flex justify-around p-10 items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-extrabold">DBU</h1>
        <BookUser size={36} strokeWidth={2.5} />
      </div>
      <nav className="flex items-center gap-4">
        <Link className="hover:border-b-2 transition-all" to={"/usuarios"}>Usuarios</Link>
        <Link className="hover:bg-lightGraay bg-blue-600 py-2 px-3 rounded-md hover:transition-all transition-all" to={"/post-usuarios"}>CRIAR</Link>
      </nav>
    </header>
  );
};
