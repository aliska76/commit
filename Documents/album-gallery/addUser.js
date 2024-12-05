const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// MongoDB URI (replace with your own MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/albumGallery';

// Define the User model (same as above)
const User = mongoose.model('User', new mongoose.Schema({
  _id: { 
    type: String, 
    default: uuidv4, 
    required: true, 
    unique: true 
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  albumCount: { type: Number, default: 0 },
}, { timestamps: true }));

// Function to add a new user
async function addUser(name, email) {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create a new user instance
    const newUser = new User({
      name: name,
      email: email,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log('New user added:', savedUser);

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding user:', error);
    mongoose.connection.close();
  }
}

// Add a new user (Replace with any name and email you want)
addUser('Alisa Rakhlina', 'aliska76e@gail.com');