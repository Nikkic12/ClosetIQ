const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"] // typical port used by vite
};

// run with "node server.js", ctrl+C to exit

app.use(cors(corsOptions));

// backend file
app.get("/api", (req, res) => {
    res.json({"fruits": ["apple", "backend data!!!!", "banana"]});
    // sends a response that contains this array of fruits, can be accessed with fruits key
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});