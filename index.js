import express from 'express';

const translateText = async (text, target) => {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encoded}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translate API error: ${res.status}`);
  const data = await res.json();
  return data[0].map(t => t[0]).join('');
};

const app = express();
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  if (typeof text !== 'string' || typeof targetLang !== 'string') {
    return res.status(400).json({ error: 'Body must include "text" and "targetLang" as strings.' });
  }
  try {
    const translated = await translateText(text, targetLang);
    res.json({ translated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Translation API running on http://localhost:${PORT}`));
