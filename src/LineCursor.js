
import {createUseStyles} from 'react-jss';
import {useEffect, useState, createRef} from 'react';

const useStyles = createUseStyles({
  rightCover: {
    backgroundColor: '#FFF',
    height: 24,
    position: 'absolute'
  },
  cursor: {
    backgroundColor: '#C4C4C4',
    width: 10,
    height: 18,
    position: 'absolute'
  }
});

export default function LineCursor(props) {
  const [cursorLeft, setCursorLeft] = useState(0);
  const [intervalState, setIntervalInState] = useState(null);
  const [emittedCompletedEvent, setEmittedCompletedEvent] = useState(false);
  const rightCoverRef = createRef();
  const onComplete = props.onComplete;

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorLeft(prevCursorLeft => prevCursorLeft + 10);
    }, 25);

    setIntervalInState(interval);
    return () => clearInterval(interval);
  }, [setIntervalInState]);

  useEffect(() => {
    if (rightCoverRef.current && rightCoverRef.current.offsetWidth === 0) {
      clearInterval(intervalState);

      if (!emittedCompletedEvent) {
        onComplete();
        setEmittedCompletedEvent(true);
      }
    }
  }, [rightCoverRef, intervalState, onComplete, emittedCompletedEvent]);

  const classes = useStyles();
  const rightCoverWidthSubtraction = 32 + cursorLeft;

  const rightCoverStyle = {
    width: "calc(100% - "+rightCoverWidthSubtraction+"px)",
    left: cursorLeft,
    top: props.top
  };

  const cursorStyle = {
    left: cursorLeft,
    top: props.top + 3
  };

  return (
    <div>
      <div 
        className={classes.rightCover}
        style={rightCoverStyle}
        ref={rightCoverRef}/>
      <div 
        className={classes.cursor}
        style={cursorStyle}/>
    </div>
  );
};
