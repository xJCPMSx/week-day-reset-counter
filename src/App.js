import React, { useState, useEffect } from 'react';
import './App.css';
import WeekDayCard from './WeekDayCard';
import { saveWeek, getSavedWeeks, clearWeeks } from './db';

function App() {
    const [activeTab, setActiveTab] = useState('current');
    const [savedWeeks, setSavedWeeks] = useState([]);

    const currentWeek = [
        { day: 'Segunda', number: 10 },
        { day: 'Terça', number: 3 },
        { day: 'Quarta', number: 11 },
        { day: 'Quinta', number: 9 },
        { day: 'Sexta', number: 2 },
    ];

    useEffect(() => {
        const fetchWeeks = async () => {
            const weeks = await getSavedWeeks();
            setSavedWeeks(weeks);
        };
        fetchWeeks();
    }, []);

    const handleSaveWeek = async () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Segunda-feira
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 4); // Sexta-feira

        const options = { month: 'short', day: 'numeric' };
        const formattedStart = startOfWeek.toLocaleDateString(undefined, options);
        const formattedEnd = endOfWeek.toLocaleDateString(undefined, options);
        const dateRange = `${formattedStart} - ${formattedEnd}`;

        // Verificar se a semana já está salva
        const isDuplicate = savedWeeks.some(week => week.dateRange === dateRange);

        if (isDuplicate) {
            alert("Esta semana já está salva!");
            return;
        }

        const newWeek = { week: currentWeek, dateRange };
        setSavedWeeks([...savedWeeks, newWeek]);

        await saveWeek(newWeek);
    };

    const handleClearWeeks = async () => {
        await clearWeeks();
        setSavedWeeks([]);
    };

    return (
        <div className="container">
            <h1 className="title">Resets de usuários realizados essa semana</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('current')}>Semana Atual</button>
                <button onClick={() => setActiveTab('saved')}>Semanas Salvas</button>
            </div>
            {activeTab === 'current' ? (
                <div className="weekday-cards">
                    {currentWeek.map((dayData, index) => (
                        <WeekDayCard key={index} day={dayData.day} number={dayData.number} />
                    ))}
                    <button onClick={handleSaveWeek}>Salvar Semana Atual</button>
                </div>
            ) : (
                <div className="saved-weeks">
                    {savedWeeks.map((savedWeek, index) => (
                        <div key={index} className="week">
                            <h3>Semana de {savedWeek.dateRange}</h3>
                            <div className="weekday-cards">
                                {savedWeek.week.map((dayData, dayIndex) => (
                                    <WeekDayCard key={dayIndex} day={dayData.day} number={dayData.number} />
                                ))}
                                <button onClick={handleClearWeeks}>Limpar Todas as Semanas</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
