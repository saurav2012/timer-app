import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import styles from './index.module.css'; // Import the CSS module

export default function Timer() {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const intervalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setAlertVisible(true); // Show the red alert
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);


  const stop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    setAlertVisible(false); // Hide the alert when resetting
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  const handleBack = () => {
    router.back();
  };

  const setTimer = () => {
    const totalSeconds = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    setTime(totalSeconds);
    if (!isRunning) {
      setIsRunning(true);
      setAlertVisible(false); // Hide the alert when starting a new timer
    }
  };

  // Format time to hh:mm:ss
  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Generate an array of options for hours, minutes, and seconds
  const generateOptions = (max) => {
    return Array.from({ length: max + 1 }, (_, i) => i);
  };

  const closeModal = () => {
    setAlertVisible(false);
  };

  return (
    <div className={styles.container}>
      <h1>Timer</h1>
      <div className={styles.inputGroup}>
        <select
          value={inputHours}
          onChange={(e) => setInputHours(Number(e.target.value))}
          className={styles.input}
        >
          {generateOptions(23).map((hour) => (
            <option className={styles.option} key={hour} value={hour}>
              {String(hour).padStart(2, '0')} Hours
            </option>
          ))}
        </select>
        <select
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          className={styles.input}
        >
          {generateOptions(59).map((minute) => (
            <option className={styles.option} key={minute} value={minute}>
              {String(minute).padStart(2, '0')} Minutes
            </option>
          ))}
        </select>
        <select
          value={inputSeconds}
          onChange={(e) => setInputSeconds(Number(e.target.value))}
          className={styles.input}
        >
          {generateOptions(59).map((second) => (
            <option className={styles.option} key={second} value={second}>
              {String(second).padStart(2, '0')} Seconds
            </option>
          ))}
        </select>
      </div>
      <p className={styles.time}>{formatTime()}</p>
      <button onClick={handleBack}>Back</button>
      <button onClick={setTimer} disabled={isRunning}>Set Timer</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>

      {alertVisible && (
        <div className={styles.alert} onClick={closeModal}>
          <div className={styles.alertContent}>
            <svg className={styles.close} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <h2 className={styles.text}>Times up!</h2>
          </div>
        </div>
      )}
    </div>
  );
}
