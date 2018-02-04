const express = require('express')
const qs = require('qs')
const app = express()
const PORT = 3000
app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
	console.log(`App is listening on PORT ${PORT}!`)
})

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  // let templateVars = { urls: urlDatabase };
  res.render("urls_index", { urls: urlDatabase });
});

app.get("/urls/:id", (req, res) => {
  res.render("urls_show", { shortURL: req.params.id });
});