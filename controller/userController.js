const usersData = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Alice Johnson", age: 28 },
];

// Get all users
 function getAllUsers(req, res) {
  try {
    res.json(usersData);
  } catch (error) {
    throw new Error("Error fetching users", error);
  }
}

// Get user by ID
 function getUserById(req, res) {
  const user = usersData.find(user => user.id === parseInt(req.params.id));
  try {
    if (!user) {
      return res.status(400).json({
        messsage: `User not found id ${req.params.id}`
      });
    }
    res.json(user);
  } catch (error) {
    throw new Error("Error fetching user by ID", error);
  }
}

// Create a new user
 function createUser(req, res) {
  const newUser = {
    id: usersData.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  if (!newUser.name || !newUser.age) {
    return res.status(400).json({ message: "Name and age are required" });
  }

  usersData.push(newUser);
  res.status(201).json(newUser);
}

// Update user by ID
 function updateUser(req, res) {
  const user = usersData.find(user => user.id === parseInt(req.params.id));
  if (user) {
    const updateUser = req.body;

    if (updateUser.name === undefined && updateUser.age === undefined) {
      return res.status(400).json({ message: "At least one field (name or age) is required for update" });
    }

    user.name = updateUser.name || user.name;
    user.age = updateUser.age || user.age;
    return res.status(200).json({
      status: "Success",
      code: "USER_UPDATED",
      message: `User with id ${req.params.id} updated successfully`,
      userUpdate: user
    });
  } else {
    return res.status(404).json({
      status: "Error",
      code: "USER_NOT_FOUND",
      message: `User not found id ${req.params.id}`
    });
  }
}

// Delete user by ID
 function deleteUser(req, res) {
  const userIndex = usersData.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    usersData.splice(userIndex, 1);
    res.json({
      status: "Success",
      code: "USER_DELETED",
      message: `User with id ${req.params.id} deleted successfully`,
      user: usersData
    });
  } else {
    return res.status(404).json({
      status: "Error",
      code: "USER_NOT_FOUND",
      message: `User not found id ${req.params.id}`
    });
  }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };