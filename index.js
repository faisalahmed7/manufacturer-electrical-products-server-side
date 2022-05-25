const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.98ofi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('manufacturerProducts').collection('products');
        const orderCollection = client.db('manufacturerProducts').collection('orders');

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const product = await productCollection.findOne(query)
            res.send(product)
        })
        app.post('/order', async (req, res) => {
            const newOrder = req.body;
            const result = await orderCollection.insertOne(newOrder);
            res.send(result)
        })

        // app.put('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updateQuantity = parseInt(req.body);
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true }
        //     const updatedDoc = {
        //         $set: {
        //             quantity: updateQuantity.quantity,

        //         }
        //     }
        //     const result = await productCollection.updateOne(filter, updatedDoc, options)
        //     res.send(result)
        // })

        app.get('/order', async (req, res) => {
            const query = {};
            const cursor = orderCollection.find(query)
            const orders = await cursor.toArray()
            res.send(orders)
        })

    }

    finally {

    }
}

run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('manufacturer server is running')
});

app.listen(port, () => {
    console.log("Listening TO The 5000", port);
})