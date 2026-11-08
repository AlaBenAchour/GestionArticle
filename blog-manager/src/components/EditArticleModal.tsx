import Modal from "./Modal";
import ArticleForm from "./ArticleForm";
import type { Article } from "../types/Article";

type Props = {
  article: Article;
  onSave: (article: Article) => boolean;
  onClose: () => void;
};

export default function EditArticleModal({ article, onSave, onClose }: Props) {
  return (
    <Modal title="Modifier l'article" onClose={onClose} maxWidth="max-w-2xl">
      <ArticleForm
        article={article}
        layout="stacked"
        submitLabel="Enregistrer"
        onCancel={onClose}
        onSubmit={(updated) => {
          const ok = onSave(updated);
          if (ok) onClose();
          return ok;
        }}
      />
    </Modal>
  );
}