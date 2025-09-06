import { BookUser } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const user = localStorage.getItem("user");

  return (
    <header className="bg-darkBlue text-white flex justify-around p-5 items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl md:text-4xl font-extrabold">DBU</h1>
        <BookUser size={36} strokeWidth={2.5} />
      </div>
      <nav className="flex items-center gap-4">
        <Link className="hover:border-b-2 transition-all" to={"/usuarios"}>
          {user ? JSON.parse(user).nome : "Usuário"}
        </Link>
        <Link
          className="hover:bg-lightGray bg-lightGraay py-2 px-3 rounded-md "
          to={"/post-usuarios"}
        >
          CRIAR
        </Link>
      </nav>
    </header>
  );
};
