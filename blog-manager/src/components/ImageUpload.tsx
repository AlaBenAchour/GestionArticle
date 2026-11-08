import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { labelClass, helpClass, errorClass } from "../types/fieldStyles";

type Props = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  maxSizeMB?: number;
  accept?: string;
  fit?: "cover" | "contain";
  initialUrl?: string | null; // image déjà enregistrée (édition)
  onChange: (file: File | null) => void;
};

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} Ko`
    : `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export default function ImageUpload({
  label,
  hint,
  error,
  required,
  maxSizeMB = 2,
  accept = "image/png,image/jpeg,image/webp",
  fit = "cover",
  initialUrl = null,
  onChange,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl);
  const [fileName, setFileName] = useState(initialUrl ? "Image actuelle" : "");
  const [fileSize, setFileSize] = useState("");
  const [localError, setLocalError] = useState("");
  const [dragging, setDragging] = useState(false);

  // Libère l'URL temporaire (blob:) quand elle change ou quand le composant disparaît
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!accept.split(",").includes(file.type)) {
      setLocalError("Format non accepté (PNG, JPG ou WebP).");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setLocalError(`L'image dépasse ${maxSizeMB} Mo.`);
      return;
    }

    setLocalError("");
    setFileName(file.name);
    setFileSize(formatSize(file.size));
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
    e.target.value = ""; // permet de re-choisir le même fichier
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleZoneKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const remove = () => {
    setPreview(null);
    setFileName("");
    setFileSize("");
    setLocalError("");
    onChange(null);
  };

  const shownError = error || localError;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      {preview ? (
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          {/* Cadre 16/9 */}
          <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800">
            <img
              src={preview}
              alt={fileName}
              className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
            />

            <button
              type="button"
              onClick={remove}
              aria-label="Supprimer l'image"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-danger"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Barre d'infos */}
          <div className="flex items-center justify-between gap-3 border-t border-gray-200 px-3 py-2 text-sm dark:border-gray-700">
            <div className="min-w-0">
              <p className="mb-0 truncate font-medium text-gray-800 dark:text-gray-200">
                {fileName}
              </p>
              {fileSize && (
                <p className="mb-0 text-xs text-gray-500 dark:text-gray-400">{fileSize}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10 dark:text-primary-light dark:hover:bg-primary/20"
            >
              Changer
            </button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={handleZoneKey}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
            dragging
              ? "border-primary bg-primary/5 dark:border-primary-light dark:bg-primary/10"
              : shownError
                ? "border-danger dark:border-red-500"
                : "border-gray-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary-light"
          }`}
        >
          <svg
            className="h-10 w-10 text-gray-400 dark:text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 7.5L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="mb-0 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium text-primary dark:text-primary-light">
              Clique pour choisir
            </span>{" "}
            ou glisse une image ici
          </p>
          <p className="mb-0 text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG ou WebP, {maxSizeMB} Mo max
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        onChange={handleInput}
        className="sr-only"
      />

      {shownError ? (
        <p className={errorClass} role="alert">
          {shownError}
        </p>
      ) : hint ? (
        <p className={helpClass}>{hint}</p>
      ) : null}
    </div>
  );
}