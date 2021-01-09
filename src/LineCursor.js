
import {createUseStyles} from 'react-jss';
import {useEffect, useState, createRef} from 'react';

const useStyles = createUseStyles({
  rightCover: {
    backgroundColor: '#FFF',
    height: 48,
    position: 'absolute',
    top: 16
  },
  cursor: {
    backgroundColor: '#C4C4C4',
    width: 10,
    height: 18,
    position: 'absolute',
    top: 19
  }
});

export default function LineCursor() {
  const [cursorLeft, setCursorLeft] = useState(0);
  const [intervalState, setIntervalInState] = useState(null);
  const rightCoverRef = createRef();

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
    }
  }, [rightCoverRef, intervalState]);

  const classes = useStyles();
  const rightCoverWidthSubtraction = 32 + cursorLeft;

  const rightCoverStyle = {
    width: "calc(100% - "+rightCoverWidthSubtraction+"px)",
    left: cursorLeft
  };

  const cursorStyle = {
    left: cursorLeft
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
