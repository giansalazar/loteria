import React, { useEffect, useState } from 'react';

const RobotVozFemenina = ({ mensaje }) => {
  const [texto, setTexto] = useState(mensaje);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const speakText = (text) => {
      // Crear un nuevo objeto de síntesis de voz
      const mensajeVoz = new SpeechSynthesisUtterance(text);

      // Asignar la voz al mensaje después de cargar todas las voces
      const setVoice = () => {
        const voces = synth.getVoices();
        const vozFemenina = voces.find(voz => voz.lang === 'es-ES' && voz.name.includes('Female'));

        if (vozFemenina) {
          mensajeVoz.voice = vozFemenina;
        } else {
          console.warn("Voz femenina en español no encontrada");
        }

        // Hablar el texto
        synth.speak(mensajeVoz);
      };

      if (synth.getVoices().length === 0) {
        synth.addEventListener('voiceschanged', setVoice);
      } else {
        setVoice();
      }
    };

    speakText(texto);

    // Limpiar al desmontar el componente
    return () => {
      synth.cancel();
    };
  }, [texto]);

  return (
    <div>
      <p>{texto}</p>
    </div>
  );
};

export default RobotVozFemenina;
