const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kazuki-takayama:kkkk6657@cluster0.vg3w0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(cors())

const findOneAndDelete = (id) => api.delete(`/mongodb+srv://kazuki-takayama:kkkk6657@cluster0.vg3w0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/${id}`);
const text = [
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
        name: "",
        name: ""
    },
]
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.get('/', (req, res) => {
    
    req.body
    console.log(1111)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
        client.connect(err => {
            const collection = client.db('Todoリスト').collection('todo');
            console.log(err)
        collection.find().toArray(function(err, result) {
            if (err) throw err;
        const todos = result
            client.close();
            
    res.json(todos)
})
})
})

app.post('/add', (req, res) => {
    req.body
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        console.log("456",err)
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

app.delete(`/todos/:id`,  (req, res)  => {
    req.body
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        console.log(err)
        const collection = client.db('Todoリスト').collection('todo');
        console.log('Ccccconnected successfully to server');
        const ObjectId = require('mongodb').ObjectId
        collection.findOneAndDelete({ _id: ObjectId(req.params) },(err, result) => {
            console.log(err)
            console.log(result);
            client.close();
        })
    res.json('success')
})
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
