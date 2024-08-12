const express=require('express');
const app=express();
const port=process.env.PORT || 5000;
const cors=require('cors');

app.use(cors());//middleware
app.use(express.json());//middleware

//KcQ38lkmNUJed1vF-password


app.get('/',(req,res)=>{
    res.send('hello world');
});

//mongodb congiguration


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:KcQ38lkmNUJed1vF@cluster0.t1j91es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //craete a collection of documents
    const booksCollections=client.db("BookInventory").collection("books");

    // insert a book to the databse:post the book ot the collection

    app.post("/upload-book",async(req,res)=>{
        const data=req.body;
        const result=await booksCollections.insertOne(data);
        res.send(result);
    })

    //get all book from database

    app.get("/all-books",async(req,res)=>{
      const books=booksCollections.find();
      const result=await books.toArray();
      res.send(result);
    })

    // update a book data : patch or update methods
    app.patch("/book/:id",async(req,res)=>{
      const id=req.params.id;
      //console.log(id);
      const updateBookData=req.body;
      const filter={_id:new ObjectId(id)};
      const options={upsert:true};
      const updateDoc={
        $set:{
          ...updateBookData
        }
      }
      // for update

      const result=await booksCollections.updateOne(filter,updateDoc,options);
      res.send(result);
    })

    //delete a book data

    app.delete("/book/:id",async(req,res)=>{
      const id=req.params.id;
      const filter={_id: new ObjectId(id)};
      const result=await booksCollections.deleteOne(filter);
      res.send(result);
    })

    //find by category

    app.get("/all-books",async(req,res)=>{
      let query={};
      if(req.query?.category){
        query={category: req.query.category}
      }
      const result=await booksCollections.find(query).toArray();
      res.send(result);

    })

    //to get single book data
    app.get("/book/:id",async(req,res)=>{
      const id=req.params.id;
      const filter={_id: new ObjectId(id)};
      const result=await booksCollections.findOne(filter);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log(`example app listening on port ${port}`);
});