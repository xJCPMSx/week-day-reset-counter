import React, { useState, useEffect } from 'react';
import './App.css';
import WeekDayCard from './WeekDayCard';
// Importando semanas salvas do arquivo local
import { savedWeeks as initialSavedWeeks } from './savedWeeks';

// Função para criar e baixar o arquivo .js com os dados das semanas
const downloadWeeksData = (weeks) => {
    const fileContent = `
        // Dados das semanas salvas
        export const savedWeeks = ${JSON.stringify(weeks, null, 2)};
    `;

    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'savedWeeks.js'; // Nome do arquivo a ser baixado
    link.click();
    URL.revokeObjectURL(url);
};

function App() {
    const [activeTab, setActiveTab] = useState('current');
    const [savedWeeks, setSavedWeeks] = useState(initialSavedWeeks || []);

    const currentWeek = [
        { day: 'Segunda', number: 10 },
        { day: 'Terça', number: 3 },
        { day: 'Quarta', number: 11 },
        { day: 'Quinta', number: 9 },
        { day: 'Sexta', number: 2 },
    ];

    const handleSaveWeek = () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 4);

        const options = { month: 'short', day: 'numeric' };
        const formattedStart = startOfWeek.toLocaleDateString(undefined, options);
        const formattedEnd = endOfWeek.toLocaleDateString(undefined, options);
        const dateRange = `${formattedStart} - ${formattedEnd}`;

        const isDuplicate = savedWeeks.some(week => week.dateRange === dateRange);
        if (isDuplicate) {
            alert("Esta semana já está salva!");
            return;
        }

        const newWeek = { week: currentWeek, dateRange };
        setSavedWeeks([...savedWeeks, newWeek]);
    };

    const handleDownloadWeeks = () => {
        downloadWeeksData(savedWeeks); // Chama a função para criar e baixar o arquivo .js
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
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handleDownloadWeeks}>Baixar Semanas Salvas</button>
        </div>
    );
}

export default App;
