// src/Components/Contacto.jsx
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Contacto.css';

function Contacto() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        hour: '2-digit', minute: '2-digit', hour12: true,
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      };
      setCurrentDateTime(new Intl.DateTimeFormat('es-EC', options).format(now));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const user = auth.currentUser;
      await addDoc(collection(db, 'Mensajes'), {
        nombre: name,
        email,
        asunto: subject,
        mensaje: message,
        createdAt: serverTimestamp(),
        uid: user ? user.uid : null,
      });

      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      alert('No se pudo enviar el mensaje. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="welcome-text">Contacto</h1>

      <div className="contact-form-container">
        <h2 className="section-title">Formulario de Contacto</h2>
        {submitted && (
          <p className="auth-success">¡Mensaje enviado con éxito! Gracias por contactarnos.</p>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="text"
            placeholder="Asunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="auth-input"
            required
          />
          <textarea
            placeholder="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="auth-input"
            rows="5"
            required
          />
          <button type="submit" className="auth-button" disabled={submitting}>
            {submitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        <p className="contact-date">Fecha y Hora Actual: {currentDateTime}</p>
      </div>
    </div>
  );
}

export default Contacto;
