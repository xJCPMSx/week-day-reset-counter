// src/App.js
import React from 'react';
import WeekDayCard from './WeekDayCard';
import './App.css';

function App() {
  const weekDays = [
    { day: 'Segunda', number: 5 },
    { day: 'Terça', number: 8 },
    { day: 'Quarta', number: 3 },
    { day: 'Quinta', number: 6 },
    { day: 'Sexta', number: 2 },
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
