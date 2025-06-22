const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crackHash = require('./crack');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());

// Root route for Elastic Beanstalk health checks
app.get('/', (req, res) => {
  res.send('Hash Cracker API is running.');
});

app.post('/api/crack', async (req, res) => {
  const { hash } = req.body;

  if (!hash) {
    return res.status(400).json({ result: 'Hash not provided' });
  }

  const result = await crackHash(hash);
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
