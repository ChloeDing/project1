const express = require('express')
const qs = require('qs')
const app = express()
const PORT = 3000
app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/help', (req, res) => {
  res.render("help", {
  	username: "ding",
  	age: 31
  })
})

app.get('/:id', (req, res) => {
  console.log(req)
  console.log(req.params)
  console.log(req.query)
  res.status(200).send("help hello")
})

app.listen(PORT, () => {
	console.log(`App is listening on PORT ${PORT}!`)
})
