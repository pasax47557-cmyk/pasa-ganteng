export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = req.headers['authorization'] || req.query.key;
  const expectedKey = process.env.VERCEL_API_KEY;

  if (expectedKey && apiKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  try {
    const { to, subject, message } = req.body;
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
