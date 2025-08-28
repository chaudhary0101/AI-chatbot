const express = require("express");
const cors = require("cors");
const path = require("path");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const ai = new GoogleGenerativeAI("AIzaSyB8mFOvpEJg_lmsSsIztTJf7XSjx_4gyIQ");

async function main(prompt) {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

app.post("/gemini", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await main(prompt);
    res.json({ text: response });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});







