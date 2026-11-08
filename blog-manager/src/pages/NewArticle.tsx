// import { useState } from "react";
// import Input from "../components/Input";
// import Dropdown from "../components/Dropdown";
// import DateInput from "../components/DateInput";
// import Button from "../components/Button";
// import ImageUpload from "../components/ImageUpload";

// const categories = [
//     { value: "react", label: "React" },
//     { value: "tailwind", label: "Tailwind CSS" },
//     { value: "typescript", label: "TypeScript" },
// ];

// export default function CreateArticle() {
//     const [title, setTitle] = useState("");
//     const [category, setCategory] = useState("");
//     const [date, setDate] = useState("");
//     const [errors, setErrors] = useState<Record<string, string>>({});
//     const [image, setImage] = useState<File | null>(null);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const next: Record<string, string> = {};
//         if (!title.trim()) next.title = "Le titre est obligatoire.";
//         if (!category) next.category = "Choisis une catégorie.";
//         if (!date) next.date = "Choisis une date.";
//         setErrors(next);
//         if (Object.keys(next).length === 0) {
//             console.log({ title, category, date });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="card max-w-lg" noValidate>
//             <h1>Créer un article</h1>

//             <Input
//                 label="Titre"
//                 placeholder="Mon premier article"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 error={errors.title}
//                 required
//             />

//             <Dropdown
//                 label="Catégorie"
//                 placeholder="Choisir une catégorie"
//                 options={categories}
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 error={errors.category}
//                 required
//             />

//             <DateInput
//                 label="Date de publication"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 min={new Date().toISOString().split("T")[0]}
//                 hint="Pas de date dans le passé."
//                 error={errors.date}
//                 required
//             />
//             <div className="max-w-xl">
//                 <ImageUpload label="Image de couverture" fit="cover" onChange={setImage} error={errors.image}
//                     required />
//             </div>
//             <Button type="submit">Publier</Button>
//         </form>
//     );
// }
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