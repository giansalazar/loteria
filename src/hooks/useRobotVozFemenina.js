import { useEffect, useState } from 'react';

const useRobotVozFemenina = (mensaje) => {
  const [texto, setTexto] = useState(mensaje);
  

  useEffect(() => {
    const synth = window.speechSynthesis;

    // Obtener voces disponibles y seleccionar una voz de mujer (si está disponible)
    const voces = synth.getVoices();
    const vozFemenina = voces.find(voz => voz.lang === 'es-LA' && voz.gender === 'female');

    // Crear un nuevo objeto de síntesis de voz
    const mensajeVoz = new SpeechSynthesisUtterance(texto);

    mensajeVoz.lang = 'es-LA';

    // Asignar la voz al mensaje
    mensajeVoz.voice = vozFemenina;

    // Hablar el texto
    synth.speak(mensajeVoz);

    // Limpiar al desmontar el componente
    return () => {
      synth.cancel();
    };
  }, [texto]);

  // Retornar el estado y la función para cambiar el texto
  return { texto, setTexto };
};

export default useRobotVozFemenina;
