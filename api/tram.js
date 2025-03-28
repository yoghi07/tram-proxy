const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const response = await fetch("https://giromilano.atm.it/proxy.tpportal/api/tpPortal/geodata/pois/5152541", {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0 Safari/537.36",
    "Referer": "https://giromilano.atm.it/",
    "Origin": "https://giromilano.atm.it"
  }
});

    const text = await response.text();

    if (!response.ok) {
      console.error("ATM responded with status:", response.status);
      console.error("ATM response body:", text);
      return res.status(response.status).send("Errore ATM");
    }

    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Errore nel proxy: " + (err.message || err.toString()));
  }
};
