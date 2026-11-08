import ConfirmDialog from "./ConfirmDialog";
import type { Article } from "../types/Article";

type Props = {
  article: Article;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteArticleDialog({
  article,
  onConfirm,
  onCancel,
}: Props) {
  return (
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
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}