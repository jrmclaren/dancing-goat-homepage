require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const app = express();
const publicPath =  path.join(__dirname, "..");
const PORT = process.env.PORT || 3000;
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

app.use(helmet());
app.use(express.static(publicPath));

app.get("/", ( req, res ) => {
   res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/map", (req, res) => {
    let response = JSON.stringify({token: MAPBOX_TOKEN});
    res.send(response);
});

app.listen( PORT, () => {
   console.log(` the goat is dancing on http://localhost:${PORT}`);
});
