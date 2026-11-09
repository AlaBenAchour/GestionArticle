# Code2Work Blog

A blog management application built with React, TypeScript and Tailwind CSS. Users can publish, read, edit, delete, search, filter and sort articles, with a light and a dark theme.

## Project Description

Code2Work Blog is a single-page application (SPA) that lets users manage their own blog without any backend: all data is stored in the browser.

### Features

- **Home page**: presentation of the tool, the blog name, statistics (articles, categories, authors) and the three latest articles.
- **Article list**: every article is displayed as a card. Clicking a card opens its details page.
- **Article details page**: cover image, category, author, publication date, estimated reading time and full content.
- **Create an article**: title, content, category, publication date, cover image and an optional author.
- **Edit an article**: the form opens in a modal, pre-filled with the current values.
- **Delete an article**: a confirmation dialog prevents accidental deletions.
- **Search**: keyword search in the title, content, author and category. The search ignores case and accents.
- **Filter and sort**: filter by category, and sort by date (newest or oldest first) or by title (A to Z or Z to A).
- **Shareable filters**: the search, category and sort are stored in the URL (for example `/articles?q=react&category=react&sort=title-asc`).
- **Dark and light mode**: the choice is saved and the system preference is used on the first visit.
- **Responsive design**: the interface adapts to mobile, tablet and desktop screens.
- **Form validation**: clear error messages, image type and size checks.

### Project Structure

```
src/
├── components/      Reusable UI components (Header, Footer, Button, Input,
│                    Dropdown, DateInput, Textarea, ImageUpload, SearchBar,
│                    Modal, ConfirmDialog, ArticleForm, EditArticleModal...)
├── hooks/           Custom hooks (useArticles, useTheme)
├── pages/           One component per route (Home, Articles,
│                    ArticleDetail, CreateArticle)
├── types/           TypeScript types, shared options and field styles
├── utils/           Pure helper functions (formatDate, filterArticles)
├── App.tsx          Layout and routes
├── main.tsx         Application entry point
└── index.css        Global styles, Tailwind theme and dark mode
```

## Technologies

| Technology | Purpose |
|---|---|
| [React](https://react.dev) | User interface, built with components and hooks |
| [TypeScript](https://www.typescriptlang.org) | Static typing for props, state and data |
| [Vite](https://vite.dev) | Development server and build tool |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling and dark mode |
| [React Router](https://reactrouter.com) | Client-side routing |
| [Fontsource Inter](https://fontsource.org/fonts/inter) | Self-hosted font |
| [ESLint](https://eslint.org) | Code quality |
| Web Storage API (`localStorage`) | Data persistence in the browser |

### Technical Choices

- **Vite instead of Create React App**: faster start-up and hot reload, and it is the current standard for new React projects.
- **TypeScript**: the `Article` type is shared by the form, the list and the storage layer, so a typo in a field name is detected at compile time.
- **Tailwind CSS**: styles are written next to the markup, and the theme (colors, font) is defined once in `index.css`. Dark mode uses a `dark` class on the `<html>` element, so the user can switch it manually.
- **`localStorage` instead of an API**: the project needs no server, which keeps it simple to install and to demonstrate. The storage code is isolated in `useArticles.ts`, so it can be replaced by API calls later without changing the components.
- **Images stored as resized WebP data URLs**: `localStorage` only stores text and is limited to about 5 MB. Images are resized to 1200 px wide and compressed before being saved.
- **Filters stored in the URL**: the state survives navigation (opening an article and going back) and a filtered page can be shared with a link.
- **Custom hooks without Context**: `useArticles` and `useTheme` encapsulate the logic. Only one page uses the articles at a time, so a React Context is not needed yet.
- **One `ArticleForm` for creation and edition**: the same component is used in a page (two columns) and in a modal (one column), so validation rules are written once.
- **Reusable components**: `Button`, `Input`, `Dropdown`, `DateInput`, `Textarea` and `ImageUpload` share the same styles and the same error handling.
- **Accessibility**: every field has a label, errors use `role="alert"`, modals close with the Escape key, and the whole card is clickable through a single real link (no nested interactive elements).

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) 20 or later
- npm (installed with Node.js)
- [Git](https://git-scm.com)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Go to the project folder:

   ```bash
   cd <project-folder>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Run the Project

Start the development server:

```bash
npm run dev
```

Then open the address displayed in the terminal, usually <http://localhost:5173>.

### Other scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Check the types and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the project |

### First use

The blog starts empty. Click **Create an article** in the header, fill in the form and publish. The article then appears on the home page and in the **Articles** page, where it can be opened, edited, deleted, searched, filtered and sorted.

> The articles are saved in the browser of the current device. Clearing the site data of the browser deletes them.

## Author

**benach_a**

Developed for Code2Work.