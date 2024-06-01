export function narrate(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'es-ES';  // Establecer el idioma a español (España)
    speechSynthesis.speak(utterance);
}