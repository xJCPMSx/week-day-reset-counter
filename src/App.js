// src/App.js
import React from 'react';
import WeekDayCard from './WeekDayCard';
import './App.css';

function App() {
  const weekDays = [
    { day: 'Segunda', number: 10 },
    { day: 'Terça', number: 3 },
    { day: 'Quarta', number: 5 },
    { day: 'Quinta', number: 0 },
    { day: 'Sexta', number: 0 },
  ];

  return (
    <div className="container">
      <h1 className="title">Resets de usuários realizados essa semana</h1>
      <div className="weekday-cards">
        {weekDays.map(({ day, number }) => (
          <WeekDayCard 
            key={day} 
            day={day} 
            number={number} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
