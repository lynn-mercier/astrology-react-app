
import {createUseStyles} from 'react-jss';
import {useEffect, useState, createRef} from 'react';
import Cursor from './Cursor';

const useStyles = createUseStyles({
  rightCover: {
    backgroundColor: '#FFF',
    height: 24,
    position: 'absolute',
    right: 0
  }
});

export default function LineCursor(props) {
  const [cursorLeft, setCursorLeft] = useState(0);
  const [intervalState, setIntervalInState] = useState(null);
  const [emittedCompletedEvent, setEmittedCompletedEvent] = useState(false);
  const rightCoverRef = createRef();
  const onComplete = props.onComplete;
  const playing = props.playing;

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setCursorLeft(prevCursorLeft => prevCursorLeft + 10);
      }, 35);

      setIntervalInState(interval);
    }
  }, [playing]);

  useEffect(() => {
    if (intervalState) {
      return () => clearInterval(intervalState);
    }
  }, [intervalState]);

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

  const rightCoverStyle = {
    left: cursorLeft,
    top: props.top
  };

  const cursorStyle = {
    left: cursorLeft,
    top: props.top+3
  };

  return (
    <div>
      <div 
        className={classes.rightCover}
        style={rightCoverStyle}
        ref={rightCoverRef}/>
      {(props.showCursor && playing) && 
        <Cursor 
        left={cursorLeft}
        top={props.top}/>
      }
    </div>
  );
};
