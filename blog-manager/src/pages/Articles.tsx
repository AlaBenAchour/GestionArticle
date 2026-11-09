import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import type { Article } from "../types/Article";
import { categoryLabel, sortOptions, DEFAULT_SORT } from "../types/options";
import type { SortKey } from "../types/options";
import { formatDate } from "../utils/formatDate";
import { applyFilters } from "../utils/filterArticles";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import ConfirmDialog from "../components/ConfirmDialog";
import EditArticleModal from "../components/EditArticleModal";

export default function Articles() {
  const { articles, updateArticle, deleteArticle } = useArticles();
  const [params, setParams] = useSearchParams(); // lire et modifier les paramètres de l'URL
  const [editing, setEditing] = useState<Article | null>(null);
  const [deleting, setDeleting] = useState<Article | null>(null);

  /* Catégories réellement présentes dans les articles */
  const categoryOptions = useMemo(
    () =>
      [...new Set(articles.map((a) => a.category))] // supprimer les doublent
        .map((value) => ({ value, label: categoryLabel(value) })) // parcour chaque element de tableau
        .sort((a, b) => a.label.localeCompare(b.label, "fr")), // trie
    [articles]
  );

  /* Filtres lus dans l'URL, avec valeurs validées */
  const query = params.get("q") ?? "";

  const categoryParam = params.get("category") ?? "";
  const category = categoryOptions.some((o) => o.value === categoryParam)
    ? categoryParam
    : "";

  const sortParam = params.get("sort");
  const sort: SortKey = sortOptions.some((o) => o.value === sortParam)
    ? (sortParam as SortKey)
    : DEFAULT_SORT;

  /** Met à jour un paramètre sans toucher aux autres */
  const updateParam = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }
    );

  const resetFilters = () => setParams({}, { replace: true });

  const hasFilters =
    query.trim() !== "" || category !== "" || sort !== DEFAULT_SORT;

  const visible = useMemo(
    () => applyFilters(articles, { query, category, sort }),
    [articles, query, category, sort]
  );

  const confirmDelete = () => {
    if (deleting) deleteArticle(deleting.id);
    setDeleting(null);
  };

  return (
    <>
      <h1>Articles</h1>

      {/* Barre de filtres */}
      {articles.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <SearchBar
            className="md:flex-1"
            value={query}
            onChange={(value) => updateParam("q", value)}
          />

          <Dropdown
            aria-label="Filtrer par catégorie"
            wrapperClassName="mb-0 md:w-52"
            options={[
              { value: "", label: "Toutes les catégories" },
              ...categoryOptions,
            ]}
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
          />

          <Dropdown
            aria-label="Trier les articles"
            wrapperClassName="mb-0 md:w-52"
            options={sortOptions}
            value={sort}
            onChange={(e) =>
              updateParam(
                "sort",
                e.target.value === DEFAULT_SORT ? "" : e.target.value
              )
            }
          />
        </div>
      )}

      {/* Résumé des filtres actifs */}
      {hasFilters && articles.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {visible.length} article{visible.length > 1 ? "s" : ""} trouvé
          {visible.length > 1 ? "s" : ""}
          {query.trim() && (
            <>
              {" "}pour «{" "}
              <strong className="text-gray-900 dark:text-white">
                {query.trim()}
              </strong>{" "}
              »
            </>
          )}
          .{" "}
          <button
            type="button"
            onClick={resetFilters}
            className="font-medium text-primary hover:underline dark:text-primary-light"
          >
            Réinitialiser
          </button>
        </p>
      )}

      {articles.length === 0 ? (
        <>
          <p>Aucun article pour le moment.</p>
          <Button to="/articles/new">Créer un article</Button>
        </>
      ) : visible.length === 0 ? (
        <div className="card text-center">
          <p>Aucun article ne correspond à vos filtres.</p>
          <Button variant="outline" onClick={resetFilters}>
            Voir tous les articles
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <article
              key={a.id}
              className="card-hover group relative flex flex-col overflow-hidden p-0"
            >
              {a.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={a.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-4">
                <div>
                  <span className="badge-info">{categoryLabel(a.category)}</span>

                  <h3 className="mt-2">
                    <Link
                      to={`/articles/${a.id}`}
                      className="text-gray-900 after:absolute after:inset-0 after:content-[''] group-hover:text-primary dark:text-white dark:group-hover:text-primary-light"
                    >
                      {a.title}
                    </Link>
                  </h3>

                  <p className="line-clamp-3 text-sm">{a.content}</p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {a.author ? `${a.author} · ` : ""}
                    {formatDate(a.publishedAt)}
                  </p>
                </div>

                <div className="relative z-10 mt-auto flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-800">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setEditing(a)}
                    aria-label={`Modifier ${a.title}`}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex-1"
                    onClick={() => setDeleting(a)}
                    aria-label={`Supprimer ${a.title}`}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal d'édition */}
      {editing && (
        <EditArticleModal
          article={editing}
          onSave={updateArticle}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Confirmation de suppression */}
      {deleting && (
        <ConfirmDialog
          title="Supprimer cet article ?"
          message={
            <>
              <p>
                Tu es sur le point de supprimer{" "}
                <strong className="text-gray-900 dark:text-white">
                  « {deleting.title} »
                </strong>
                .
              </p>
              <p className="mb-0 text-danger dark:text-red-400">
                Cette action est irréversible.
              </p>
            </>
          }
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}