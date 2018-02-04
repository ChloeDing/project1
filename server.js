const express = require('express')
const qs = require('qs')
const app = express()
const PORT = 3000
const bodyParser = require("body-parser")
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))

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

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  let longURL = req.body.longURL;
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  // res.send("Ok: "+ shortURL);
  res.redirect("/u/" + shortURL);   
});

app.post("/urls/delete/:id", (req, res) => {
  let shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.render("urls_index", { urls: urlDatabase });   
});

app.get("/urls/:id", (req, res) => {
  res.render("urls_show", { shortURL: req.params.id, longURL: urlDatabase[req.params.id] });   
});

app.post("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  urlDatabase[shortURL] = req.body.longURL;
  res.render("urls_index", { urls: urlDatabase });   
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

function generateRandomString() {
  var text = "";
  var size = 6;
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < size; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}