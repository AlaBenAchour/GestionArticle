import { useState } from "react";
import type { FormEvent } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Dropdown from "./Dropdown";
import DateInput from "./DateInput";
import Button from "./Button";
import ImageUpload from "./ImageUpload";
import type { Article } from "../types/Article";
import { fileToDataUrl } from "../hooks/useArticles";
import { categories, authors, withCurrent } from "../types/options";

type Props = {
  article?: Article;
  layout?: "split" | "stacked"; // split : page, stacked : modal
  submitLabel?: string;
  onSubmit: (article: Article) => boolean; // false si le stockage est plein
  onCancel?: () => void;
};

const today = new Date().toISOString().split("T")[0];

export default function ArticleForm({
  article,
  layout = "split",
  submitLabel = "Publier",
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [author, setAuthor] = useState(article?.author ?? ""); // "" = aucun auteur
  const [category, setCategory] = useState(article?.category ?? "");
  const [date, setDate] = useState(article?.publishedAt ?? today);
  // undefined = image inchangée, File = nouvelle image, null = image retirée
  const [image, setImage] = useState<File | null | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // empêcher le rechargement de la page

    const hasImage =
      image instanceof File || (image === undefined && !!article?.image); // transforme une valeur en booleen

    const next: Record<string, string> = {}; // crée un objet vide qui va recevoir les erreurs détectées.
    if (!title.trim()) next.title = "Le titre est obligatoire.";
    if (content.trim().length < 20)
      next.content = "Le contenu doit faire au moins 20 caractères.";
    if (!category) next.category = "Choisis une catégorie.";
    if (!date) next.date = "Choisis une date.";
    if (!hasImage) next.image = "Ajoute une image de couverture.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    try { // convertir l'image
      let finalImage: string | null;
      if (image instanceof File) finalImage = await fileToDataUrl(image);
      else if (image === undefined) finalImage = article?.image ?? null;
      else finalImage = null;

      const ok = onSubmit({
        id: article?.id ?? crypto.randomUUID(), // crier un identifient unique
        createdAt: article?.createdAt ?? new Date().toISOString(),
        title: title.trim(),
        content: content.trim(),
        author,
        category,
        publishedAt: date,
        image: finalImage,
      });

      if (!ok) {
        setErrors({
          image: "Stockage plein : essaie avec une image plus petite.",
        });
      }
    } catch {
      setErrors({ image: "Impossible de lire cette image." });
    } finally {
      setSaving(false);
    }
  };

  const titleField = (
    <Input
      label="Titre"
      placeholder="Mon premier article"
      value={title}
      onChange={(e) => setTitle(e.target.value)} // stocker se que utilisateur ecrie
      error={errors.title}
      required
    />
  );

  const contentField = (
    <Textarea
      label="Contenu"
      placeholder="Écris ton article ici..."
      rows={layout === "split" ? 12 : 8}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      error={errors.content}
      required
    />
  );

  const imageField = (
    <ImageUpload
      label="Image de couverture"
      hint="Format 16/9 conseillé."
      fit="cover"
      initialUrl={article?.image}
      onChange={setImage}
      error={errors.image}
      required
    />
  );

  const authorField = (
    <Dropdown
      label="Auteur"
      // hint="Optionnel."
      options={[
        { value: "", label: "Aucun auteur" },
        ...withCurrent(authors, article?.author),
      ]}
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
    />
  );

  const categoryField = (
    <Dropdown
      label="Catégorie"
      placeholder="Choisir une catégorie"
      options={withCurrent(categories, article?.category)}
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      error={errors.category}
      required
    />
  );

  const dateField = (
    <DateInput
      label="Date de publication"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      min={article ? undefined : today} // pas de limite à l'édition
      error={errors.date}
      required
    />
  );


  if (layout === "split") {
    return (
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            {titleField}
            {contentField}
          </div>

          <div className="space-y-6">
            <div className="card">{imageField}</div>
            <div className="card">
              {authorField}
              {categoryField}
              {dateField}
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <Button variant="secondary" onClick={onCancel}>
                  Annuler
                </Button>
              )}
              <Button type="submit" loading={saving} className="flex-1">
                {submitLabel}
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {titleField}
      {contentField}
      <div className="grid gap-x-4 sm:grid-cols-2">
        {authorField}
        {categoryField}
      </div>
      {dateField}
      {imageField}

      <div className="mt-2 flex justify-end gap-2">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit" loading={saving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}