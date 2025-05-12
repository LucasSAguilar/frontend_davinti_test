import { Link } from "react-router-dom";
import PersonTable from "../../features/PersonTable";
import styles from "./styles.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

function Home() {
  return (
    <div className={styles.homeScreen}>
      <PersonTable />
      <div className={styles.boxButton}>
        <Link to="/contact" className={styles.addButton}>
          Adicionar novo contato
        </Link>
      </div>
    </div>
  );
}

export default Home;
