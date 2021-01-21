import {createUseStyles} from 'react-jss';
import {useState, useEffect} from 'react';
import Measure from 'react-measure';

const useStyles = createUseStyles({
  root: {
    visibility: 'hidden'
  }
});

export default function LineSplitter(props) {
  const fullText = props.fullText;
  const words = props.fullText.split(" ");
  const [spaceIndex, setSpaceIndex] = useState(0);
  const [text, setText] = useState("");
  const [emittedLine, setEmittedLine] = useState(false);
  const [intervalState, setIntervalInState] = useState(null);
  const onLineSplit = props.onLineSplit;

  useEffect(() => {
    setText(words.slice(0, spaceIndex).join(" "));
  }, [words, spaceIndex]);

  useEffect(() => {
    if (spaceIndex > words.length) {
      clearInterval(intervalState);
      onLineSplit(words.join(" "));
      setEmittedLine(true);
    }
  }, [spaceIndex, words, intervalState, onLineSplit]);

  useEffect(() => {
    if (fullText !== "" && !intervalState) {
      const interval = setInterval(() => {
        setSpaceIndex((prevSpaceIndex) => prevSpaceIndex + 1);
      }, 50);

      setIntervalInState(interval);
    }
  }, [fullText, intervalState]);

  useEffect(() => {
    if (intervalState) {
      return () => clearInterval(intervalState);
    }
  }, [intervalState]);

  const onResize = (contentRect) => {
    if (fullText !== "" && !emittedLine && contentRect.entry && contentRect.entry.height > 21) {
      onLineSplit(words.slice(0, spaceIndex - 1).join(" "));
      setEmittedLine(true);
      clearInterval(intervalState);
    }
  }

  const classes = useStyles();

  return (
    <Measure onResize={onResize}>
    {({ measureRef }) => (
      <div className={classes.root} ref={measureRef}>
        {text}
      </div>
    )}
    </Measure>
  );
};
