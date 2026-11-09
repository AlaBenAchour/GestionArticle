import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger-light"
      : "text-gray-900 hover:bg-danger/10 hover:text-danger dark:text-gray-100 dark:hover:bg-danger/20 dark:hover:text-danger-light"
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        {/* Logo + nom du blog */}
        <Link to="/" className="flex items-center gap-2 hover:no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger text-sm font-bold text-white">
            C2W
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Code2Work Blog
          </span>
        </Link>

        {/* Liens + actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={linkClass}>
            Accueil
          </NavLink>
          <NavLink to="/articles" end className={linkClass}>
            Articles
          </NavLink>

          <Button
            to="/articles/new"
            size="sm"
            variant="danger"
            className="ml-1 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="sm:hidden" aria-hidden="true">+</span>
            <span className="sr-only sm:not-sr-only">Créer un article</span>
          </Button>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}