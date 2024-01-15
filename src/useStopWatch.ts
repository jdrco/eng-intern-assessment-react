import { useState, useEffect, useRef } from 'react';

export enum StopwatchStatus {
  Running,
  Paused,
}

export const useStopWatch = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [stopwatchStatus, setStopwatchStatus] = useState<StopwatchStatus>(
    StopwatchStatus.Paused
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (stopwatchStatus === StopwatchStatus.Running) {
      startTimeRef.current = Date.now() - timeElapsed;
      intervalRef.current = setInterval(() => {
        setTimeElapsed(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [stopwatchStatus]);

  const startStopwatch = () => {
    setStopwatchStatus(StopwatchStatus.Running);
  };

  const stopStopwatch = () => {
    setStopwatchStatus(StopwatchStatus.Paused);
  };

  return {
    timeElapsed,
    stopwatchStatus,
    stopStopwatch,
    startStopwatch,
  };
};
