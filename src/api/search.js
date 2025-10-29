export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { q, page = 1 } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter required" });
  }

  const params = new URLSearchParams({
    q,
    sortBy: "publishedAt",
    page,
    pageSize: 12,
    apiKey: process.env.NEWS_API_KEY,
  });

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?${params.toString()}`,
      {
        headers: {
          "User-Agent": "NewsHub/1.0",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Search failed",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Search failed" });
  }
}
