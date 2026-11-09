import { Link } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import { categoryLabel } from "../types/options";
import { formatDate } from "../utils/formatDate";
import { SITE } from "../types/options";
import Button from "../components/Button";

const features = [
  {
    title: "Publier un article",
    text: "Rédige ton article avec un titre, un contenu, une catégorie, un auteur et une image de couverture.",
    paths: ["M12 20h9", "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"],
  },
  {
    title: "Gérer ses contenus",
    text: "Modifie ou supprime un article en un clic, avec une confirmation avant toute suppression.",
    paths: ["M12 20h9", "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"],
  },
  {
    title: "Rechercher",
    text: "Retrouve instantanément un article par son titre, son contenu, son auteur ou sa catégorie.",
    paths: ["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.35-4.35"],
  },
  {
    title: "Mode clair / sombre",
    text: "Bascule d'un thème à l'autre selon tes préférences. Ton choix est mémorisé.",
    paths: ["M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"],
  },
];

export default function Home() {
  const { articles } = useArticles();

  // Les nouveaux articles sont ajoutés en tête de liste
  const latest = articles.slice(0, 3);
  const categoryCount = new Set(articles.map((a) => a.category)).size;
  const authorCount = new Set(articles.map((a) => a.author).filter(Boolean)).size;

  const stats = [
    { label: "Articles", value: articles.length },
    { label: "Catégories", value: categoryCount },
    { label: "Auteurs", value: authorCount },
  ];

  return (
    <div className="space-y-16">
      {/* ---------- Hero ---------- */}
      <section className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-danger text-xl font-bold text-white shadow-sm">
          C2W
        </div>

        <span className="badge-info">{SITE.tagline}</span>

        <h1 className="mx-auto mt-4 max-w-3xl">
          Bienvenue sur <span className="text-danger dark:text-danger-light">{SITE.name}</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          {SITE.description}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button to="/articles" variant="danger" size="lg">
            Voir les articles
          </Button>
          <Button to="/articles/new" variant="secondary" size="lg">
            Écrire un article
          </Button>
        </div>
      </section>

      {/* ---------- Statistiques ---------- */}
      <section aria-label="Statistiques du blog">
        <dl className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card text-center">
              <dd className="text-3xl font-bold text-gray-900 dark:text-white">
                {s.value}
              </dd>
              <dt className="text-sm text-gray-500 dark:text-gray-400">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Fonctionnalités ---------- */}
      <section>
        <h2 className="text-center">Ce que tu peux faire</h2>
        <p className="mx-auto mb-8 max-w-xl text-center text-gray-600 dark:text-gray-400">
          {SITE.name} est un outil simple pour gérer ton propre blog.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger-light">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {f.paths.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
              </div>
              <h3 className="text-lg">{f.title}</h3>
              <p className="mb-0 text-sm text-gray-600 dark:text-gray-400">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Derniers articles ---------- */}
      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="mb-0">Derniers articles</h2>
          {articles.length > 0 && (
            <Link to="/articles" className="text-sm font-medium">
              Tout voir →
            </Link>
          )}
        </div>

        {latest.length === 0 ? (
          <div className="card text-center">
            <p>Aucun article publié pour le moment.</p>
            <Button to="/articles/new" variant="danger">
              Publier le premier article
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <article
                key={a.id}
                className="card-hover group relative flex flex-col overflow-hidden p-0"
              >
                {a.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={a.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-4">
                  <span className="badge-info">{categoryLabel(a.category)}</span>

                  <h3 className="mt-2 text-lg">
                    <Link
                      to={`/articles/${a.id}`}
                      className="text-gray-900 after:absolute after:inset-0 after:content-[''] group-hover:text-danger dark:text-white dark:group-hover:text-danger-light"
                    >
                      {a.title}
                    </Link>
                  </h3>

                  <p className="line-clamp-2 text-sm">{a.content}</p>

                  <p className="mb-0 text-xs text-gray-500 dark:text-gray-400">
                    {a.author ? `${a.author} · ` : ""}
                    {formatDate(a.publishedAt)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ---------- À propos ---------- */}
      <section className="card text-center">
        <h2>À propos de {SITE.company}</h2>
        <p className="mx-auto mb-0 max-w-2xl text-gray-600 dark:text-gray-400">
          {SITE.company} accompagne les équipes et les développeurs dans leur
          montée en compétences. Ce blog rassemble nos articles, nos retours
          d'expérience et nos bonnes pratiques.
        </p>
      </section>
    </div>
  );
}