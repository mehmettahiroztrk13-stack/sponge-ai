const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Render port (ÇOK ÖNEMLİ)
const PORT = process.env.PORT || 3000;

// Ana test sayfası
app.get("/", (req, res) => {
  res.send("🚀 Sponge AI Server Çalışıyor!");
});

// Basit test API
app.get("/test", (req, res) => {
  res.json({
    status: "ok",
    message: "Server aktif",
    time: new Date()
  });
});

// OpenAI endpoint (hazır altyapı)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message gerekli" });
    }

    // Şimdilik basit cevap (AI bağlamadan test için)
    res.json({
      reply: "Mesaj aldım: " + userMessage
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server hatası" });
  }
});

// Server başlat
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});