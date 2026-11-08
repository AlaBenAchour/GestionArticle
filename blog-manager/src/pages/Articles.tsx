import { useState } from "react";
import { useArticles } from "../hooks/useArticles";
import type { Article } from "../types/Article";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import EditArticleModal from "../components/EditArticleModal";

export default function Articles() {
  const { articles, updateArticle, deleteArticle } = useArticles();
  const [editing, setEditing] = useState<Article | null>(null);
  const [deleting, setDeleting] = useState<Article | null>(null);

  const confirmDelete = () => {
    if (deleting) deleteArticle(deleting.id);
    setDeleting(null);
  };

  return (
    <>
      <h1>Articles</h1>

      {articles.length === 0 ? (
        <>
          <p>Aucun article pour le moment.</p>
          <Button to="/articles/new">Créer un article</Button>
        </>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a.id} className="card-hover flex flex-col overflow-hidden p-0">
              {a.image && (
                <img
                  src={a.image}
                  alt={a.title}
                  className="aspect-video w-full object-cover"
                />
              )}

              <div className="flex flex-1 flex-col p-4">
                <div>
                  <span className="badge-info">{a.category}</span>
                  <h3 className="mt-2">{a.title}</h3>
                  <p className="line-clamp-3 text-sm">{a.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {a.author} · {a.publishedAt}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-800">
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