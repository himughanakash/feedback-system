import React, { useState, useEffect } from 'react';
import './FeedbackDashboard.css'; 

const FeedbackDashboard = ({ feedbacks }) => {
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  useEffect(() => {
    let updatedFeedbacks = [...feedbacks];

    if (filterCategory !== 'All') {
      updatedFeedbacks = updatedFeedbacks.filter(
        (f) => f.category === filterCategory
      );
    }

    updatedFeedbacks.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredFeedbacks(updatedFeedbacks);
  }, [feedbacks, filterCategory, sortOrder]);

  return (
    <div className="dashboard-container">
      <h2 className="heading">Feedback Dashboard</h2>

      <div className="filter-container">
        <select
          value={filterCategory}
          onChange={handleCategoryFilterChange}
          className="select"
        >
          <option value="All">All Categories</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="select-last"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Name</th>
              <th className="th">Email</th>
              <th className="th">Feedback</th>
              <th className="th">Category</th>
              <th className="th">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((f) => (
              <tr key={f._id} className="tr-hover">
                <td className="td">{f.name}</td>
                <td className="td">{f.email}</td>
                <td className="td">{f.feedback}</td>
                <td className="td">{f.category}</td>
                <td className="td">
                  {f.timestamp ? new Date(f.timestamp).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
