const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Investment API Server is active.' });
});

// Investment Portfolio API
app.get('/api/portfolio', (req, res) => {
  res.json({
    totalBalance: 24500.80,
    dailyProfitLoss: 320.50,
    dailyChangePercent: "+1.32%",
    holdings: [
      { id: 1, symbol: 'BTC', name: 'Bitcoin', amount: 0.45, value: 29250.00 },
      { id: 2, symbol: 'ETH', name: 'Ethereum', amount: 3.2, value: 8320.00 },
      { id: 3, symbol: 'GOLD', name: 'Gold Spot', amount: 10, value: 2750.00 },
    ]
  });
});

app.listen(PORT, () => {
  console.log('Backend server running on http://localhost:${PORT}');
});