//initialize express
const express = require('express')
const app = express()

// initialize mongodb
// const MongoClient = require('mongodb').MongoClient;

// initialize cors
var cors = require('cors');
app.use(cors());

// initialize env
require('dotenv').config()
const port = 5500

//default

app.get('/', (req, res) => {
    res.send("It's working correctly...")
})

// for body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())



// driver code
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mrcleanuser:NXXS8gwXQUBhzGTI@cluster0.t0mah.mongodb.net/mrcleandata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const reviewCollection = client.db("mrcleandata").collection("mrclencollection");
  const servicesCollection = client.db('mrcleandata').collection('servicesCollection');
  const adminCollection = client.db('mrcleandata').collection('admins');


  console.log(err);

// review insert into mongodb
app.post('/addReview', (req, res) => {
    const reviewData = req.body; 
    reviewCollection.insertOne(reviewData)
    .then(result => {
      res.send(result.insertedCount > 0)
      console.log(result);
    })
 })
 
 // review  read data
 app.get('/reviewInfo', (req, res) => {
   reviewCollection.find({})
   .toArray((error, documents) => {
       res.send(documents)
   })
 })
 
 
 // insert services data
 app.post('/addService', (req, res) => {
   const flower = req.body ;
   console.log(flower);
   servicesCollection.insertOne(flower)
   .then(result => {
       res.send(result.insertedCount > 0)
       console.log(result);
   })
 })
 
 // get service info
 app.get('/servicesInfo', (req, res) => {
   servicesCollection.find({})
   .toArray((error, documents) => {
       res.send(documents)
   })
 })
 
 
 // add admin
 app.post('/makeAdmin', (req, res) => {
   const admins = req.body ;
   adminCollection.insertOne(admins)
   .then(result => {
     res.send(result.insertedCount > 0)
     console.log(result);
   })
 })
 
 
 // admin info
 app.post('/isAdmin', (req, res) => {
   adminCollection.find({email: req.body.email})
   .toArray((error, documents) => {
       res.send(documents.length > 0)
   })
 })
 
});



app.listen(process.env.PORT || port)
