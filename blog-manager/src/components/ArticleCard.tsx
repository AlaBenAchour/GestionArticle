import { Link } from "react-router-dom";
import type { Article } from "../types/Article";
import Button from "./Button";
import { categoryLabel } from "../types/options";
import { formatDate } from "../utils/formatDate";

type Props = {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
};

export default function ArticleCard({ article, onEdit, onDelete }: Props) {
  const detailsUrl = `/articles/${article.id}`;

  return (
    <article className="card-hover flex flex-col overflow-hidden p-0">
      {article.image && (
        <Link to={detailsUrl} tabIndex={-1} aria-hidden="true" className="block">
          <img
            src={article.image}
            alt=""
            className="aspect-video w-full object-cover"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div>
          <span className="badge-info">{categoryLabel(article.category)}</span>

          <h3 className="mt-2">
            <Link
              to={detailsUrl}
              className="text-gray-900 hover:text-primary dark:text-white dark:hover:text-primary-light"
            >
              {article.title}
            </Link>
          </h3>

          <p className="line-clamp-3 text-sm">{article.content}</p>

          <Link to={detailsUrl} className="text-sm font-medium">
            Lire la suite →
          </Link>

          <p className="mb-0 mt-3 text-xs text-gray-500 dark:text-gray-400">
            {article.author} · {formatDate(article.publishedAt)}
          </p>
        </div>

        <div className="mt-auto flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-800">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(article)}
            aria-label={`Modifier ${article.title}`}
          >
            Modifier
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(article)}
            aria-label={`Supprimer ${article.title}`}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </article>
  );
}