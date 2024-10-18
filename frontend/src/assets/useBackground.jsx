import { useEffect } from 'react';

const useBackground = (imageUrl) => {
  useEffect(() => {
    // Aseguramos que el html y body ocupen el 100% del viewport
    document.documentElement.style.height = '100%'; // Para asegurar que el html ocupe todo el alto
    document.body.style.height = '100%'; // Asegura que el body ocupe todo el alto de la página
    document.body.style.margin = '0'; // Eliminar márgenes
    document.body.style.padding = '0'; // Eliminar padding

    // Aplica la imagen de fondo usando url() para que el CSS lo entienda correctamente
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover'; // Ajusta el tamaño de la imagen para que cubra la pantalla completa
    document.body.style.backgroundPosition = 'center'; // Centra la imagen
    document.body.style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
    document.body.style.backgroundAttachment = 'fixed'; // Hace que el fondo esté fijo mientras se desplaza
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo semitransparente

    return () => {
      // Limpia el fondo al desmontar el componente
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = '';
    };
  }, [imageUrl]);
};

export default useBackground;
