import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { saveArticle } from "../hooks/useArticles";

export default function CreateArticle() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Créer un article</h1>

      <ArticleForm
        submitLabel="Publier"
        onSubmit={(article) => {
          const ok = saveArticle(article);
          if (ok) navigate("/articles");
          return ok;
        }}
      />
    </>
  );
}