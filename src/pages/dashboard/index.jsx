// pages/dashboard.js
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const Dashboard = () => {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleStopwatchClick = () => {
    router.push('/stopwatch');
  };

  const handleTimerClick = () => {
    router.push('/timer');
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const handStyle = (length, width, rotate) => ({
    width: `${length}%`,
    height: `${width}px`,
    transform: `rotate(${rotate}deg)`,
  });

  const hourHand = handStyle(35, 6, ((hours % 12) * 30) + (minutes / 2) - 90);
  const minuteHand = handStyle(45, 4, minutes * 6 - 90);
  const secondHand = handStyle(45, 2, seconds * 6 - 90);

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <button onClick={handleStopwatchClick}>Stopwatch</button>
      <button onClick={handleTimerClick}>Timer</button>
      <button>Clock</button>

      <div className={styles.clock}>
        <div className={styles.hourHand} style={hourHand}></div>
        <div className={styles.minuteHand} style={minuteHand}></div>
        <div className={styles.secondHand} style={secondHand}></div>
      </div>
      <h2 className={styles.time}>{time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }).toUpperCase()}</h2>
    </div>
  );
};

export default Dashboard;
