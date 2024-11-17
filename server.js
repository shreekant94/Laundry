const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/home" || req.url == "/") {
    const filepath = path.join(__dirname, "index.html");
    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.log("Error reading file", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url == "/about") {
    const filepath = path.join(__dirname, "about.html");
    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.log("Error reading file", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url == "/service") {
    const filepath = path.join(__dirname, "service.html");
    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.log("Error reading file", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url == "/contact") {
    const filepath = path.join(__dirname, "contact.html");
    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.log("Error reading file", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url == "/style.css") {
    const filepath = path.join(__dirname, "style.css");
    fs.readFile(filepath, (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else if (req.url == "/script.js") {
    const filepath = path.join(__dirname, "script.js");
    fs.readFile(filepath, (err, data) => {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
