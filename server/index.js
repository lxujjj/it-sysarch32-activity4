const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const ProductModel = require('./models/Product'); // Correct import for OrderModel

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");


app.post('/create', (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.post('/product', (req, res) => {
    ProductModel.create(req.body)
    .then(prods => res.json(prods))
    .catch(err => res.json(err));
});

app.get('/products', (req, res) => {
    ProductModel.find()
      .then(products => res.json(products))
      .catch(err => res.json(err));
  });


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
