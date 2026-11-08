import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import { categoryLabel } from "../types/options";
import { formatDate } from "../utils/formatDate";
import Button from "../components/Button";
import EditArticleModal from "../components/EditArticleModal";
import DeleteArticleDialog from "../components/DeleteArticleDialog";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
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

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Par <strong className="font-semibold">{article.author}</strong> ·{" "}
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

      {editing && (
        <EditArticleModal
          article={article}
          onSave={updateArticle}
          onClose={() => setEditing(false)}
        />
      )}

      {deleting && (
        <DeleteArticleDialog
          article={article}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(false)}
        />
      )}
    </article>
  );
}