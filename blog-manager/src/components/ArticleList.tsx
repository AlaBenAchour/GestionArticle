import type { Article } from "../types/Article";
import ArticleCard from "./ArticleCard";
import Button from "./Button";

type Props = {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
};

export default function ArticleList({ articles, onEdit, onDelete }: Props) {
  if (articles.length === 0) {
    return (
      <div className="card text-center">
        <p>Aucun article pour le moment.</p>
        <Button to="/articles/new">Créer un article</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <ArticleCard
          key={a.id}
          article={a}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}