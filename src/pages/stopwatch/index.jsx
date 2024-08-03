// pages/stopwatch.js
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Total seconds
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          if (prevMilliseconds >= 99) {
            setTime((prevTime) => prevTime + 1);
            return 0;
          }
          return prevMilliseconds + 1;
        });
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setMilliseconds(0);
  };

  const handleBack = () => {
    router.back();
  };

  // Format time to hh:mm:ss:ms
  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <h1>Stopwatch</h1>
      <p className={styles.time}>{formatTime()}</p>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
