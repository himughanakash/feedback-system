import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';  

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    feedback: '',
    category: 'Suggestion',
  });
  const postApi = 'http://localhost:5000/feedback';
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(postApi, form);
      alert('Feedback submitted!');
      onFeedbackSubmit();
      setForm({ name: '', email: '', feedback: '', category: 'Suggestion' });
    } catch (err) {
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Submit Feedback</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="input"
        />
        <textarea
          name="feedback"
          placeholder="Your Feedback"
          value={form.feedback}
          onChange={handleChange}
          required
          className="textarea"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="select"
        >
          <option>Suggestion</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
        </select>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
