const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const response = await fetch("https://giromilano.atm.it/proxy.tpportal/api/tpPortal/geodata/pois/5152541");

    if (!response.ok) {
      return res.status(response.status).send("Errore ATM");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Errore nel proxy: " + (err.message || err.toString()));
  }
};
