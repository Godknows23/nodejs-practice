const { Console } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());

mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("Hello my own people!  Welcome to Velocity");
});
app.get("/another", (req, res) => {
  res.send("This is another page for made for routing");
});

// Read product or Fetch product

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// find or search product using ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create a new product 
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Update product 

app.put("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id,req.body);
      if(!product){
      return res.status(404).json({message: `cannot find product with ID ${id}`})
     
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
//Delete a product

app.delete("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if(!product){
      return res.status(404).json({message: `cannot find product with ID ${id} it has been changed or deleted`})
     
    }
    const deletedProduct = await Product.findById(id);
    res.status(200).json(deletedProduct); 
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

//connection string to connect to MongoDB

mongoose
  .connect(
    "mongodb+srv://godknows:godknows@cluster0.yl4ruya.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Node api app is running on port 3000 ");
    });
  })
  .catch((error) => {
    console.log(error);
  });
