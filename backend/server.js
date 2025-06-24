require('dotenv').config();  
const express = require('express');
const serverless = require('serverless-http'); 
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

// CORS Middleware
app.use(cors());

// JSON & Body Parsing Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '60mb' }));
app.use(bodyParser.json({ limit: '60mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define Schema
const accountsSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  qrCode: String,
  profile: {
    title: String,
    slogan: String,
    product: String,
    description: String,
    feature1: String,
    feature2: String,
    feature3: String,
    contact1: String,
    contact2: String,
    image: String,
  },
  freelance: {
    name: String,
    branding1: String,
    branding2: String,
    aboutMe: String,
    skill1: String,
    skill2: String,
    skill3: String,
    service1: String,
    service2: String,
    service3: String,
    projectName1: String,
    projectDescription1: String,
    projectLink1: String,
    projectName2: String,
    projectDescription2: String,
    projectLink2: String,
    contact1: String,
    contact2: String,
  },
  service: {
    title: String,
    slogan: String,
    product: String,
    image: String,
    description: String,
    service1: String,
    service2: String,
    service3: String,
    service4: String,
    feature1: String,
    feature2: String,
    feature3: String,
    testimonialQuote1: String,
    testimonialName1: String,
    testimonialQuote2: String,
    testimonialName2: String,
    contact1: String,
    contact2: String
  },
  dynamic: {
    html: String,
    css: String
  }
}, { strict: false });

const AccountModel = mongoose.model('Account', accountsSchema);

// Routes

// Register
app.post('/register', async (req, res) => {
  const { username, email, password, qrCode, profile, freelance, service, dynamic } = req.body;
  try {
    const newAccount = new AccountModel({ username, email, password, qrCode, profile, freelance, service, dynamic });
    await newAccount.save();
    res.status(201).json({ message: "Account created successfully", id: newAccount._id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const account = await AccountModel.findOne({ email, password });
    if (!account) return res.status(401).json({ message: "Incorrect email or password" });
    res.status(200).json({ message: "Log in successful", id: account._id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get profile types
app.get('/templates/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  try {
    const account = await AccountModel.findById(id);
    if (!account || !account[type]) return res.status(404).json({ message: "Data not found" });
    res.json({ [type]: account[type] });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update profile types
app.post('/templates/:type/profile/:id', async (req, res) => {
  const { type, id } = req.params;
  const update = req.body[type];
  try {
    const updated = await AccountModel.findByIdAndUpdate(id, { [type]: update }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Profile updated successfully", user: updated });
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Dynamic Portfolio - Get
app.get('/dynamic/portfolio/:id', async (req, res) => {
  try {
    const account = await AccountModel.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "No portfolio found" });
    res.status(200).json({ user: account.dynamic });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Dynamic Portfolio - Save
app.post('/saveTemplate/:id', async (req, res) => {
  const { html, css } = req.body;
  try {
    const updated = await AccountModel.findByIdAndUpdate(
      req.params.id,
      { dynamic: { html, css } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Failed to save" });
    res.status(200).json({ message: "Saved template", user: updated });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send(" E-Business Card running successfully");
});

// Start server
app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});

// For Netlify Functions
module.exports = app;
module.exports.handler = serverless(app);
