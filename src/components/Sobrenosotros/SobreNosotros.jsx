import React from 'react';
import './SobreNosotros.css';

function SobreNosotros() {
  return (
    <div className="sobre-nosotros-container">

      <section className="hero-section">
        <div className="container mx-auto px-6">
          <h1>Sobre Nosotros</h1>
          <p>
            El gimnasio de la Escuela Politécnica Nacional es un espacio dedicado al bienestar físico y mental de la comunidad politécnica. Ofrecemos instalaciones modernas y un ambiente seguro para que estudiantes, docentes y personal administrativo puedan entrenar, mejorar su salud y alcanzar sus objetivos personales. Nuestro compromiso es brindar una experiencia cómoda, organizada y accesible para todos los usuarios.
          </p>
        </div>
      </section>


      <section className="mission-vision-section">
        <div className="mission-vision-grid">
          <div className="card">
            <h2>Nuestra Misión</h2>
            <p>
              Facilitar el acceso al entrenamiento físico a través de una plataforma en línea que permita a los usuarios agendar sus cupos de manera rápida y sencilla, eliminando las largas filas y mejorando la organización del gimnasio. Promovemos la actividad física como un pilar fundamental del desarrollo integral de nuestra comunidad.
            </p>
          </div>
          <div className="card">
            <h2>Nuestra Visión</h2>
            <p>
              Convertirnos en un modelo de gestión eficiente para gimnasios universitarios, integrando tecnología, servicio y bienestar. Aspiramos a que el gimnasio de la EPN sea reconocido por su innovación en el manejo de reservas, calidad en sus servicios y por fomentar un estilo de vida saludable en toda la comunidad educativa.
            </p>
          </div>
        </div>
      </section>


      <section className="gallery-section">
        <div className="container mx-auto px-6">
          <h2>Nuestro Espacio</h2>
          <div className="gallery-grid">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Gimnasio - Sala de pesas"
            />
            <img
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77"
              alt="Gimnasio - Clase grupal"
            />
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
              alt="Gimnasio - Entrenamiento funcional"
            />
          </div>
        </div>
      </section>


      <section className="team-section">
        <div className="container mx-auto px-6">
          <h2>Nuestro Equipo</h2>
          <div className="team-grid">
            <div className="team-card">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA2gMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABwQAQEBAQEBAAMAAAAAAAAAAAABETFBIVFh8P/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcG/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDyE4rMvxp5518AQUAE9XwPBSHVk+GKhBUihgaqYIL5EUAIBQUAEoFpOlSAXqyCIEq6fF2qOMXUig0IrILABepSKB4kMVQAUSqCAUAJxdEUEqlAi6kS9AnWk9AWsqnoLFxI0I4RZUIEaWIIrQioBphQXTUkOVRQlACppqCylSK0BAQDQBIuJxVDSpDQXU9EBrV2pgI4qiwZjXgixG1hAQUAA6qUFqfQlAxanVvAE08WAgqAoeIBVICpUi1FQBQI3s/qxGvn4UcQijEFFStgEQUD0F1KU6AYWKAeABeEKcAM+hAPS/T0URTBBCNIKgUXBY1rJn7VHKL1mLBmNZioJWlABYCwEUQFCAACAAB8DAEnVINAUAKmqAnq4IgaoKOQRRBUjUSqAeiqAqGLE1dRVtT5SkVACAfDBQQioBYqKAhQFZXQExYrPoLAAcY0kz8qCwIJQUQVorKmi+BeALKWpq36qCaqCqJrQiGhgpTUIDSAIk6pUBazFBTDaRQcpAiiQioIqiasqAqKqi+JhqopxFAAAEBa1OIihAE0MaiI1oiWC2oAAAupD4DnFQEigCgCCk6oC1kAUABQVUoACgAgCigIAAHgCJOtYAr/2Q=="
                alt="Oscar Vasquez"
              />
              <h3>Oscar Vasquez</h3>
            </div>
            <div className="team-card">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALAAvQMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAABf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJ4BZRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z"
                alt="Carlos Simbaña"
              />
              <h3>Carlos Simbaña</h3>
            </div>
            <div className="team-card">
              <img src="data:image/jpeg;base64,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" alt="" />
              <h3>Ariel Paz</h3>
            </div>
          </div>
        </div>
      </section>


      <section className="map-section">
        <div className="container mx-auto px-6">
          <h2>Encuéntranos</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31918.299461808638!2d-78.5234781966416!3d-0.22545171980110562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a107e1cd44b%3A0x88a284f66939ed4!2sESCUELA%20POLIT%C3%89CNICA%20NACIONAL!5e0!3m2!1ses-419!2sec!4v1754596215315!5m2!1ses-419!2sec"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
            <footer className="footer">
        <p>&copy; 2025 Polygym</p>
        <p>Contacto: info@polygym.com | +1-123-456-7890</p>
        <p>Horario: Lunes-Viernes, 8:00 AM - 6:00 PM</p>
      </footer>
    </div>
  );
}

export default SobreNosotros;