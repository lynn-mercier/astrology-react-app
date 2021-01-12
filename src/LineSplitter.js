import {createUseStyles} from 'react-jss';
import {useState, useEffect, createRef} from 'react';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    visibility: 'hidden'
  }
});

export default function LineSplitter(props) {
  const ref = createRef();
  const words = props.fullText.split(" ");
  const [spaceIndex, setSpaceIndex] = useState(0);
  const [text, setText] = useState("");
  const [emittedLine, setEmittedLine] = useState(false);
  const onLineSplit = props.onLineSplit;

  useEffect(() => {
    setText(words.slice(0, spaceIndex).join(" "));
  }, [words, spaceIndex]);

  useEffect(() => {
    if (ref.current && ref.current.offsetHeight < 24+1) {
      if (spaceIndex < words.length) {
        setSpaceIndex(prevSpaceIndex => prevSpaceIndex + 1);
      } else if (!emittedLine) {
        onLineSplit(words.join(" "));
        setEmittedLine(true);
      }
    } else if (!emittedLine) {
      onLineSplit(words.slice(0, spaceIndex - 2).join(" "));
      setEmittedLine(true);
    }
  }, [ref, text, words, spaceIndex, onLineSplit, emittedLine]);

  const classes = useStyles();
  const className = classes.root+" "+props.className;

  return (
    <div className={className} ref={ref}>
      {text}
    </div>
  );
};
