app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message gerekli" });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API KEY YOK" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: "You are Sponge AI. Never repeat user."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data); // 🔥 EN ÖNEMLİ SATIR

    if (!data.choices) {
      return res.status(500).json({ error: data });
    }

    const reply = data.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.log("SERVER ERROR:", err); // 🔥 HATAYI GÖRECEĞİZ
    res.status(500).json({ error: "SERVER CRASH" });
  }
});
