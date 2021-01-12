import {createUseStyles} from 'react-jss';
import {useState, useEffect, createRef} from 'react';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginLeft: 16,
    visibility: 'hidden'
  },
  paragraph: {
    fontFamily: 'Roboto Mono',
    lineHeight: '24px',
    width: 'calc(100% - 32px)',
    '&:before': {
      display: 'inline-block',
      content: '""',
      width: 0,
      height: 32,
      verticalAlign: 0
    },
    '&:after': {
      display: 'inline-block',
      content: '""',
      width: 0,
      height: 8,
      verticalAlign: -8
    }
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
    if (ref.current && ref.current.offsetHeight === 40) {
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

  return (
    <div className={classes.root}>
      <div className={classes.paragraph} ref={ref}>
        {text}
      </div>
    </div>
  );
};
