import styles from "./SearchBar.module.css";
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}

export default function SearchBar ({onSubmit}: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const searchQuery = formData.get("query") as string;
    if (!searchQuery) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(searchQuery);
  };
  
    return (
  <header className={styles.header}>
  <div className={styles.container}>
    <a
      className={styles.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form action={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header>
  );
}

