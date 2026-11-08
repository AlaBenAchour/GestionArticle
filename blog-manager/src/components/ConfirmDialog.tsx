import type { ReactNode } from "react";
import Modal from "./Modal";
import Button from "./Button";

type Props = {
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Supprimer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="text-sm text-gray-700 dark:text-gray-300">{message}</div>

      <div className="mt-6 flex justify-end gap-2">
        {/* autoFocus sur Annuler : Entrée n'efface rien par erreur */}
        <Button variant="secondary" onClick={onCancel} autoFocus>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}