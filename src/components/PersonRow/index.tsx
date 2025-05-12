import { Link } from 'react-router-dom';
import { Contact } from '../../types/contact';
import styles from './styles.module.css';

type Props = {
  contact: Contact;
  removeContact: (id: number) => void;
};

const PersonRow = ({ contact, removeContact }: Props) => {
  return (
    <div className={styles.tableRow}>
      <p className={styles.tableCell}>{contact.id}</p>
      <p className={styles.tableCell}>{contact.nome}</p>
      <p className={styles.tableCell}>{contact.idade}</p>
      <div className={styles.actions}>
        <Link to={`/contact/${contact.id}`} className={styles.actionButton}>E</Link>
        <button onClick={() => removeContact(contact.id as number)} className={styles.actionButton}>-</button>

      </div>
    </div>
  );
};

export default PersonRow;