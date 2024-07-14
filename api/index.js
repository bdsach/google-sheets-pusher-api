require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("public"));

/* Routes */
app.get("/api/hello", (req, res) => {
    res.json({message: process.env.TEXT})
});
// app.get("/api/post/:slug", getPostViews);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;