const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kazuki-takayama:kkkk6657@cluster0.vg3w0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors())

app.get('/', (req, res) => {
    const text =  [
        {
        Todo: 1,
        name: "",
        name: ""
        },
        {
        予定: 2,
        name: "",
        name: ""
        },
        {
        完了: 3,
        name: "資料作成",
        name: "資料作成"
        },
    ]
    res.json(text)
})

app.post('/add', (req, res) => {
    console.log(req.body)
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    console.log(err)
    const collection = client.db('Todoリスト').collection('todo');
        console.log('Connected successfully to server');
        
        collection.insertOne(req.body, (err, result) => {
            console.log(err)
            console.log('Inserted document into the collection');
            console.log(result);
            client.close();
        })
        
        });
    res.json('success')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

