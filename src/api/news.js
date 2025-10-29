export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const {
    category = "general",
    country = "us",
    page = 1,
    sources = "",
  } = req.query;

  const params = new URLSearchParams({
    apiKey: process.env.NEWS_API_KEY,
    page,
    pageSize: 12,
  });

  // Either use sources OR category+country
  if (sources) {
    params.append("sources", sources);
  } else {
    params.append("category", category);
    params.append("country", country);
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?${params.toString()}`,
      {
        headers: {
          "User-Agent": "NewsHub/1.0",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || "Failed to fetch news",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
