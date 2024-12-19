export default async function handler(req, res) {
  const { accessToken, ...queryParams } = req.query;
  const queryString = new URLSearchParams(queryParams).toString();
  const baseUrl = 'https://mstanotest.daktela.com/api/v6';
  const url = `${baseUrl}${req.url.split('?')[0]}?accessToken=${accessToken}${queryString ? `&${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}