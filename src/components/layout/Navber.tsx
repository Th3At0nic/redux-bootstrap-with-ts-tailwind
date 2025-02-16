import { ModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <nav className=" p-4 flex bg-blue-900 justify-around items-center">
      <div className="flex items-center">
        {/* Logo */}
        <div className="text-green-500 pr-10 text-2xl font-bold">
          <span>MyLogo</span>
        </div>

        {/* Task (e.g., Home) */}
        <div className="pr-5">
          <a
            href="/"
            className="text-green-500 hover:text-gray-400 transition-colors duration-300"
          >
            Home
          </a>
        </div>
      </div>
      <ModeToggle />
    </nav>
  );
}
