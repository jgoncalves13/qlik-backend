import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  try {
    const resp = await fetch("https://<TU_TENANT>.qlikcloud.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: "user_default",
        sub: "cavida.pt/ivida.hugo.santos" //  el usuario a impersonar
      })
    });

    const data = await resp.json();

    if (!resp.ok) {
      return res.status(resp.status).json(data);
    }

    res.json(data); // { access_token, token_type, expires_in }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
