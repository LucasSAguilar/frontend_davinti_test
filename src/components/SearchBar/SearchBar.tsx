import { useState } from "react";
import styles from "./styles.module.css";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar por nome ou número"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className={styles.submitButton}>
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;