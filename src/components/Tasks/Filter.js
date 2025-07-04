import React from "react";
import './Tasks.css'
function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedDeadline,
  setSelectedDeadline,
}) {
  return (
    <div className="filters" style={{}}>
      <div className="filter-group">
        <label>Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Learning</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Deadline: </label>
        <select
          value={selectedDeadline}
          onChange={(e) => setSelectedDeadline(e.target.value)}
        >
          <option>All</option>
          <option>Overdue</option>
          <option>Due Today</option>
          <option>Upcoming</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
