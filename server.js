const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 Sponge AI Server Çalışıyor!");
});

app.get("/test", (req, res) => {
  res.json({
    status: "ok",
    message: "Server aktif",
    time: new Date()
  });
});

// CHAT ENDPOINT
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message gerekli" });
    }

    // Şimdilik basit cevap (AI bağlı değil)
    const reply = "Sponge AI dedi ki: " + userMessage;

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server hatası" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
