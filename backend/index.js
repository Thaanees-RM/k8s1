const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    message: "Hello from Kubernetes Backend 🚀",
    time: new Date()
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
