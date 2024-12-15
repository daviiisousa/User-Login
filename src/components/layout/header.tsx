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
          <Link to={"/usuarios"}>GET</Link>
          <Link to={"/post-usuarios"}>POST</Link>
          <Link to={""}>PUT</Link>
          <Link to={""}>DELETE</Link>
        </nav>
    </header>
  );
};
