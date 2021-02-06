const fs = require("fs");
const path = require("path");
const moment = require("moment");
const express = require('express');

const config = require("./config.json")
const AylienTextAnalysisApi = require("./AylienTextAnalysisApi");

const app = express();
const PORT_NUMBER = config.PORT;
const http = require('http').Server(app);

// Configure Express

const aylienApi = new AylienTextAnalysisApi();

// Middleware to log requests
app.use("/", async (req, res, next) => {
  console.log(moment().format("MM/DD/YYYY HH:mm:ss"), "REQUEST", req.originalUrl);
  next();
});


// Configure Routing
app.get('/', (req, res) => {
  return res.send("Aylien API Microservice is up.");
});

app.get('/summarize', async (req, res) => {
  const articleUri = req.query.query;
  return res.send(
    await aylienApi.summarizeArticle(articleUri)
  );
});

app.get('/extract', async (req, res) => {
  const articleUri = req.query.query;
  return res.send(
    await aylienApi.extractArticle(articleUri)
  );
});

app.get('/analyzeSentiment', async (req, res) => {
  const query = req.query.query;
  return res.send(
    await aylienApi.analyzeSentiment(query)
  );
});

app.get('/detectlanguage', async (req, res) => {
  const query = req.query.query;
  return res.send(
    await aylienApi.detectLanguage(query)
  );
});

app.get('/suggesthashtag', async (req, res) => {
  const query = req.query.query;
  return res.send(
    await aylienApi.suggestHashtags(query)
  );
});

// Express-Server Start Up
http.listen(PORT_NUMBER, async () => {
  console.log(`listening on *:${PORT_NUMBER}`);
});