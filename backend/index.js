const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// test route
app.get('/', async (req,res) => {
    res.send("Hello from backend");
});

// register user/authentication
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  return res.json({ username: username, secret: "sha256..." });
});

const PORT = 5000;
app.listen(PORT,() =>(
    console.log(`Server is running on ${PORT} 🟢`)
));