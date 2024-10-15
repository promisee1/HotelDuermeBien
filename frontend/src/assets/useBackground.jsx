import { useEffect } from 'react';

const useBackground = (imageUrl) => {
  useEffect(() => {
    // Aplica la imagen de fondo usando url() para que el CSS lo entienda correctamente
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover'; // Ajusta el tamaño de la imagen para que cubra la pantalla completa
    document.body.style.backgroundPosition = 'center'; // Centra la imagen
    document.body.style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Agrega un fondo transparente
    document.body.style.backgroundOpacity = '0.5'; // Reduce la opacidad
    return () => {
      // Limpia el fondo al desmontar el componente
      document.body.style.backgroundImage = '';
    };
  }, [imageUrl]);
};

export default useBackground;
