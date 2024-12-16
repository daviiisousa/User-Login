import { BookUser } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-darkBlue text-white flex justify-around p-10 items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl">DBU</h1>
        <BookUser size={36} strokeWidth={1} />
      </div>
      <nav className="flex gap-4">
        <Link className="hover:border-b-2 transition-all" to={"/usuarios"}>Usuarios</Link>
        <Link className="hover:border-b-2 transition-all" to={"/post-usuarios"}>Criar</Link>
      </nav>
    </header>
  );
};
