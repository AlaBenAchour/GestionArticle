import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import { categoryLabel } from "../types/options";
import { formatDate } from "../utils/formatDate";
import Button from "../components/Button";
import EditArticleModal from "../components/EditArticleModal";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>(); // recuper les parametre de URL
  const navigate = useNavigate();
  const { articles, updateArticle, deleteArticle } = useArticles();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="card mx-auto max-w-lg text-center">
        <h1>Article introuvable</h1>
        <p>Cet article n'existe pas ou a été supprimé.</p>
        <Button to="/articles">Retour aux articles</Button>
      </div>
    );
  }
// calcule le temps de lecture
  const readingTime = Math.max(
    1,
    Math.round(article.content.split(/\s+/).length / 200)
  );

  const handleDelete = () => {
    deleteArticle(article.id);
    navigate("/articles");
  };

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/articles" className="mb-6 inline-block text-sm font-medium">
        ← Retour aux articles
      </Link>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="mb-6 aspect-video w-full rounded-xl object-cover shadow-sm"
        />
      )}

      <span className="badge-info">{categoryLabel(article.category)}</span>

      <h1 className="mt-3">{article.title}</h1>

      {/* Auteur affiché seulement s'il existe */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {article.author && (
          <>
            Par <strong className="font-semibold">{article.author}</strong> ·{" "}
          </>
        )}
        {formatDate(article.publishedAt)} · {readingTime} min de lecture
      </p>

      <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

      {/* whitespace-pre-line conserve les retours à la ligne du textarea */}
      <div className="whitespace-pre-line text-lg leading-relaxed text-gray-800 dark:text-gray-200">
        {article.content}
      </div>

      <div className="mt-10 flex gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button variant="outline" onClick={() => setEditing(true)}>
          Modifier
        </Button>
        <Button variant="danger" onClick={() => setDeleting(true)}>
          Supprimer
        </Button>
      </div>

      {/* Modal d'édition */}
      {editing && (
        <EditArticleModal
          article={article}
          onSave={updateArticle}
          onClose={() => setEditing(false)}
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
                  « {article.title} »
                </strong>
                .
              </p>
              <p className="mb-0 text-danger dark:text-red-400">
                Cette action est irréversible.
              </p>
            </>
          }
          onConfirm={handleDelete}
          onCancel={() => setDeleting(false)}
        />
      )}
    </article>
  );
}