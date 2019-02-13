const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')
const app = express()
const port = 8000

app.use(cors())
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'crud';
const client = new MongoClient(url);

var db

client.connect(function(err) {
  assert.equal(null, err);
  db = client.db(dbName);
});

app.get('/', (req, res) => res.send('Hello World!'))

app.put('/delete', (req, res) => {
  console.log(req.body)
  var oid = new ObjectID(req.body._id)
  db.collection('products').deleteOne({_id: oid}, (err, result) => {
    console.log(result)
  })
})

app.put('/update', (req, res) => {
  console.log(req.body)
  var oid = new ObjectID(req.body._id)
  const set = {
    $set: {
      title: req.body.title,
      status: req.body.status,
      clientCode: req.body.clientCode,
      brand: req.body.brand,
      modelNumber: req.body.modelNumber,
      dimensions: req.body.dimensions,
      weight: req.body.weight,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      listedPrice: req.body.listedPrice,
      sellingPrice: req.body.sellingPrice,
      reserve: req.body.reserve,
    }
  }
  db.collection('products').updateOne({_id: oid}, set, (err, result) => {
    console.log(result)
  })
})

app.post('/add', (req, res) => {
  db.collection('products').insertOne(req.body, (err, result) => {
    console.log(result)
  })
})

app.get('/get', (req, res) => {
  db.collection('products').find({}).toArray((err, result) => {
    res.json(result)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
