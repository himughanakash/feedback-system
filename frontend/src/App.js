import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';
import axios from 'axios';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const feedbackApi = 'http://localhost:5000/feedback';
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(feedbackApi);
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>User Feedback System</h1>
      <FeedbackForm onFeedbackSubmit={fetchFeedbacks} />
      <hr style={{ margin: '40px 0' }} />
      <FeedbackDashboard feedbacks={feedbacks} />
    </div>
  );
}

export default App;
