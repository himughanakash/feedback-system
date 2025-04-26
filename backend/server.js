const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const api = 'mongodb://localhost:27017/feedbackDB';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(api, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String,
  category: String,
  timestamp: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).send('Feedback submitted!');
  } catch (err) {
    res.status(500).send('Error saving feedback');
  }
});

app.get('/feedback', async (req, res) => {
  try {
    const data = await Feedback.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching feedback');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
