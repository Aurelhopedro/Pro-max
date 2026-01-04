// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Página de teste
app.get("/", (req, res) => {
  res.send("servidor Pro-max");
});

// Rota para disparar o build do APK
app.post("/build", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Aurelhopedro/Apk-crear/dispatches",
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event_type: "build-apk",
          client_payload: req.body || {}
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({
        success: false,
        error: text
      });
    }

    res.json({
      success: true,
      message: "Build iniciado com sucesso",
      actions_url: "https://github.com/Aurelhopedro/Apk-crear/actions"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Porta do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Pro-max rodando na porta ${PORT}`);
});
