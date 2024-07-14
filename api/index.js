require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.static("public"));

/* Routes */
app.get("/api/hello", (req, res) => {
  res.json({ message: process.env.GOOGLE_SHEETS_ENDPOINT });
});

app.post("/api/add", async (req, res) => {
  const dataToSend = [
    {
      user: "express axios",
      email: "alice@example.com",
      text: "Hello, how are you today?",
    },
  ];

  try {
    const response = await axios.post("https://script.google.com/macros/s/AKfycbwZN3_NvKZ09anruAExwOSS0j4J3JGTxpr1JaqOv_xl4RxrzLR_Moh521q0AFUcveri-g/exec", dataToSend);
    res.json({
      message: "Post is work!",
      googleScriptResponse: response.data
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending data to Google Script",
      error: error.message
    });
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
