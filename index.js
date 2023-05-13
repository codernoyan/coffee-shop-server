const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ufdxsbo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    res.send({
      success: false,
      error: error.message
    })
  }
}
// run mongodb
dbConnect();

// mongodb document collections
const coffeeProductsCollection = client.db('coffeshop').collection('coffeeProducts');

// get all coffee products
app.get('/coffees', async (req, res) => {
  try {
    const query = {};
    const cursor = coffeeProductsCollection.find(query);
    const result = await cursor.toArray();

    res.send(result);

  } catch (error) {
    res.send({
      success: false,
      error: error.message
    })
  }
})


app.get('/', (req, res) => {
  res.send('Coffee shop server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
})