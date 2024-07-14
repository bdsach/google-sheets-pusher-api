require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.post("/api/new", async (req, res) => {
  const { user, email, text } = req.body;
  const dataToSend = [
    {
      user,
      email,
      text,
    },
  ];

    try {
      const response = await axios.post(process.env.GOOGLE_SHEETS_ENDPOINT, dataToSend);
      res.json({
        message: "It's on Google Sheets now.",
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
