export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-gray-500 sm:flex-row dark:text-gray-400">
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          Code2Work
        </span>
        <p className="mb-0">© {year} Code2Work. Tous droits réservés.</p>
      </div>
    </footer>
  );
}