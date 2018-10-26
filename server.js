const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let shoppingCart = []

app.get('/Cart', (req, res) => {
  res.send(shoppingCart)
});

app.post('/Cart', (req, res) => {
  shoppingCart.push(req.body)
});

app.delete('/Cart/:id', (req, res) => {
  let index = parseInt(req.params.id)
  //console.log(index + 1)
  // save currentshopingcart in new variable
  currentCart = shoppingCart
  // save everything before our item to remove in cartStart var
  cartStart = currentCart.splice(0, index)
  // save everthing after our item to remove in cartEnd var
  cartEnd = currentCart.splice(index + 1)
  // redefine shoppingCart as {...cartStart, ...cartEnd}
  shoppingCart = [...cartStart, ...cartEnd]
  res.send(shoppingCart);
});

// app.listen(8080);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

