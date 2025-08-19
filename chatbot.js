const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


//serve html from express
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const ai = new GoogleGenAI({apiKey: "AIzaSyB8mFOvpEJg_lmsSsIztTJf7XSjx_4gyIQ"});

app.post("/gemini", async (req, res) => {
  const prompt = req.body.prompt;
  const response = await main(prompt);
  res.json({ text: response });
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:prompt,
  });

  return response.text;
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});





