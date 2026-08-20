export function createSpeechController(
  synth = globalThis.speechSynthesis,
  Utterance = globalThis.SpeechSynthesisUtterance
) {
  const supported = Boolean(synth && Utterance);
  return {
    supported,
    stop() { synth?.cancel?.(); },
    speak(text, { lang = 'ko-KR', rate = 1, onstart, onend } = {}) {
      if (!supported || !String(text).trim()) return false;
      synth.cancel();
      const utterance = new Utterance(String(text).replaceAll('[[', '').replaceAll(']]', ''));
      utterance.lang = lang;
      utterance.rate = rate;
      if (onstart) utterance.onstart = onstart;
      if (onend) utterance.onend = onend;
      const voices = synth.getVoices?.() || [];
      const language = lang.toLowerCase().slice(0, 2);
      utterance.voice = voices.find(voice => voice.lang?.toLowerCase().startsWith(language)) || null;
      synth.speak(utterance);
      return true;
    }
  };
}
