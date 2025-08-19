const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());