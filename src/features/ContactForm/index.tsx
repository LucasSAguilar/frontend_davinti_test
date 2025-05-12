import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { createContact, getContactByID, updateContact } from "./contactData";
import { Contact } from "../../types/contact";
import { toast, ToastContainer } from "react-toastify";

const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState<Contact>({
    nome: "",
    idade: 0,
    numeros: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const data = await getContactByID(parseInt(id));
        setContact(data);
        console.log(data);

        setIsEditing(true);
      } catch (err) {
        console.error("Erro ao carregar pessoa:", err);
      }
    };

    fetchData();
  }, [id]);

  const handlePhoneChange = (phoneId: number, value: string) => {
    setContact((prev) => ({
      ...prev,
      numeros: prev.numeros?.map((p) =>
        p.id === phoneId ? { ...p, numero: value } : p
      ),
    }));
  };

  const addPhone = () => {
    setContact((prev) => ({
      ...prev,
      numeros: [
        ...(prev.numeros || []),
        { id: Date.now(), numero: "", idcontato: prev.id || 0 },
      ],
    }));
  };

  const removePhone = (phoneId: number) => {
    setContact((prev) => ({
      ...prev,
      numeros: prev.numeros?.filter((p) => p.id !== phoneId) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateContact(contact)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Erro ao atualizar contato:", err);
          toast.error("Erro ao atualizar contato.");
        });
      return;
    }
    createContact(contact)
      .then(() => {
        toast.error("Contato cadastrado com sucesso!");
        setContact({ nome: "", idade: 0, numeros: [] });
      })
      .catch((err) => {
        console.error("Erro ao salvar contato:", err);
        toast.error("Erro ao atualizar contato.");
      });
  };

  return (
    
    <form className={styles.form} onSubmit={handleSubmit}>
    <ToastContainer />
      <h2 className={styles.title}>
        {isEditing ? "Edição de Contato" : "Cadastro de Contato"}
      </h2>

      <label className={styles.label}>
        Nome:
        <input
          className={styles.input}
          type="text"
          value={contact.nome}
          onChange={(e) => setContact({ ...contact, nome: e.target.value })}
          required
        />
      </label>

      <label className={styles.label}>
        Idade:
        <input
          className={styles.input}
          type="number"
          value={contact.idade}
          onChange={(e) =>
            setContact({ ...contact, idade: parseInt(e.target.value) || 0 })
          }
          required
        />
      </label>

      <div className={styles.phonesSection}>
        <label className={styles.label}>Telefones:</label>
        {contact.numeros?.map((phone) => (
          <div key={phone.id} className={styles.phoneRow}>
            <input
              className={styles.input}
              type="text"
              placeholder="(00) 00000-0000"
              value={phone.numero}
              onChange={(e) => handlePhoneChange(phone.id, e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removePhone(phone.id)}
            >
              -
            </button>
          </div>
        ))}

        <button type="button" className={styles.addButton} onClick={addPhone}>
          + Adicionar Telefone
        </button>
      </div>

      <button type="submit" className={styles.submitButton}>
        {isEditing ? "Salvar alterações" : "Cadastrar"}
      </button>

      <Link to="/" className={styles.returnButton}>
        Retornar
      </Link>
    </form>
  );
};

export default ContactForm;
