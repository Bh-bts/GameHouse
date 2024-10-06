import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [displayedNumbers, setDisplayedNumbers] = useState([]);
  const [remainingNumbers, setRemainingNumbers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const initialNumbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));
    const newRemainingNumbers = Array.from({ length: 25 }, (_, i) => i + 26);
    
    setDisplayedNumbers(initialNumbers);
    setRemainingNumbers(shuffleArray(newRemainingNumbers));
  }, []);

  useEffect(() => {
    let interval = null;

    if (startTime && !endTime) {
      interval = setInterval(() => {
        setElapsedTime(((performance.now() - startTime) / 1000).toFixed(3));
      }, 100);
      setTimer(interval);
    }

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = (totalSeconds % 1).toFixed(3).slice(2);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
  };

  const handleClick = (number) => {
    if (number === current) {
      const clickTime = performance.now();

      if (current === 1) {
        setStartTime(clickTime);
      }

      const index = displayedNumbers.indexOf(number);
      if (index !== -1) {
        const newNumbers = [...displayedNumbers];
        newNumbers[index] = remainingNumbers[0];
        setDisplayedNumbers(newNumbers);
        setRemainingNumbers(remainingNumbers.slice(1));
      }

      setCurrent(current + 1);

      if (current === 50) {
        setEndTime(clickTime);
      }
    }
  };

  const handleRestart = () => {
    const initialNumbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));
    const newRemainingNumbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 26));
    
    setDisplayedNumbers(initialNumbers);
    setRemainingNumbers(newRemainingNumbers);
    setCurrent(1);
    setStartTime(null);
    setEndTime(null);
    setElapsedTime(0);
    clearInterval(timer);
  };

  const renderGrid = () => {
    return displayedNumbers.map((number, index) => (
      <button
        key={index}
        className={`grid-item ${number === undefined ? 'empty' : ''}`}
        onClick={() => handleClick(number)}
        disabled={number < current}
      >
        {number !== undefined ? number : ""}
      </button>
    ));
  };

  return (
    <div className="App">
      <h1>1 to 50 Game</h1>
      <p>Current Number: {current}</p> {/* Display the current number */}
      <div className="grid-container">{renderGrid()}</div>
      <p>Click the numbers in order!</p>
      
      {startTime && !endTime && (
        <p>Elapsed Time: {formatTime(elapsedTime)}</p>
      )}

      {endTime && (
        <p>Your time: {formatTime((endTime - startTime) / 1000)} seconds</p>
      )}

      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
}

export default App;
