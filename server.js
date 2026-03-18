const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 Sponge AI Server Çalışıyor!");
});

// CHAT (GERÇEK AI)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message gerekli" });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a crazy, emotional SpongeBob-like character. You can get angry, confused, or happy. Never repeat the user's message. Always respond differently."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await aiResponse.json();

    const reply = data.choices?.[0]?.message?.content || "I don't know what to say.";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Something went wrong..." });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
