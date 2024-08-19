// src/WeekDayCard.js
import React from 'react';

const WeekDayCard = ({ day, number }) => {
  return (
    <div className="weekday-card">
      <h2>{day}</h2>
      <div className="number-display">{number}</div>
    </div>
  );
};

export default WeekDayCard;
