export function Voice({texto}) {
    // Crear un nuevo objeto de síntesis de voz
    var synth = window.speechSynthesis;

    // Obtener el texto que quieres que el robot diga
    
    // Crear un nuevo objeto de síntesis de voz
    var mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = 'es-LA';

    var voces = synth.getVoices();
    var vozFemenina = voces.find(voz => voz.lang === 'es-LA' && voz.gender === 'female');

    mensaje.voice = vozFemenina;

    // Hablar el texto
    return { voice: synth.speak(mensaje)}
}