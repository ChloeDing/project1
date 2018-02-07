const express = require('express')
const qs = require('qs')
const app = express()
const PORT = 3000
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

var users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

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
  let templateVars = {
    user: users[req.cookies["user_id"]],
    urls: urlDatabase
  };
  res.render("urls_index", templateVars);
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

app.get("/register", (req, res) => {
  res.render("register");   
});

app.get("/login", (req, res) => {
  res.render("register");   
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  for(var id in users) {
    if (users[id].email === email) {
      res.cookie("user_id", users[id].id);
      res.redirect("/urls");
    }
  }
});

app.post("/logout", (req, res) => {
  res.cookie("user_id", "");
  res.redirect("/urls");  
});

app.post("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  urlDatabase[shortURL] = req.body.longURL;
  res.render("urls_index", { urls: urlDatabase });   
});

app.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if(!email || !password) {
    res.status(400).send('Email or Password is empty!');
  }
  let id = generateRandomString(5);
  users[id] = {
    "id": id,
    "email": email,
    "password": password
  }
  res.cookie("user_id", id);
  res.redirect("/urls"); 
});

function generateRandomString(size) {
  var text = "";
  if(!size) {
    size = 6;
  }

  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < size; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}