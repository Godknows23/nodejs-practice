const { Console } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/employeeModel");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("Hello my own people!  Welcome to Velocity");
});
app.get("/another", (req, res) => {
  res.send("This is another page for made for routing");
});

// Read Employee or Fetch

app.get("/employees", async (req, res) => {
  try {
    const employee = await Employee.find(req.body);
    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// find or search Employee using ID
app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create a new Employee
app.post("/addemployees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Update Employee

app.put("/employees/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndUpdate(id,req.body);
      if(!employee){
      return res.status(404).json({message: `cannot find product with ID ${id}`})
     
    }
    const updatedEmployee = await Employee.findById(id);
    res.status(200).json(updatedEmployee);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
//Delete an Employee

app.delete("/deleteemployees/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndDelete(id);
      if(!employee){
      return res.status(404).json({message: `cannot find product with ID ${id} it has been changed or deleted`})
     
    }
    const deletedEmployee = await Employee.findById(id);
    res.status(200).json(deletedEmployee); 
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
