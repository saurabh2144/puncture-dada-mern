import axios from 'axios';

export const detectLanguage = async (text) => {
  const res = await axios.post(`http://localhost:5000/detect`, { q: text });
  return res.data[0]?.language || 'en';  // ye returen karta hai ek array jisme [{language hi,comfidence 99%},{language hinglish ,confidence 33%}] aoiese deta hai 
};

export const translateText = async (text, targetLang) => {
  if (!targetLang) return text;
  const res = await axios.post(`http://localhost:5000/translate`, {
    q: text,
    source: 'auto',
    target: targetLang,
    format: 'text'
  });
  return res.data.translatedText;
};
