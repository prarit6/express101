import express from "express";

const users = express.Router();

const usersData = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Alice Johnson", age: 28 },
];

//Get all users
users.get("/", (req, res) => {
  try {
    res.json(usersData);
  } catch (error) {
    throw new Error("Error fetching users", error);
  }
});

//Get user by ID
users.get("/:id", (req, res) => {
  const user = usersData.find(user => user.id === parseInt(req.params.id))
  try{
    if(!user){
      return res.status(404).json({
        messsage:`User not found id ${req.params.id}`
      })
    }
   res.json(user);
  }
  catch (error) {
    throw new Error("Error fetching user by ID", error);
  }
});

//Create a new user
users.post("/", (req, res) =>{
  const newUser = {
    id: usersData.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  if(!newUser.name || !newUser.age) {
    return res.status(400).json({ message: "Name and age are required" });
  }

  usersData.push(newUser);
  res.json(usersData);

})

export default users;
