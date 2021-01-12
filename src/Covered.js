import {createUseStyles} from 'react-jss';
import {useState, useEffect} from 'react';
import LineCursor from './LineCursor';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginLeft: 16
  },
  lineContainer: {
    display: 'inline-block',
    position: 'relative',
  },
  line: {
    '&:before': {
      display: 'inline-block',
      content: '""',
      width: 0,
      height: 16,
      verticalAlign: 0
    },
    '&:after': {
      display: 'inline-block',
      content: '""',
      width: 0,
      height: 8,
      verticalAlign: -8
    }
  },
  topLine: {
    '&:before': {
      display: 'inline-block',
      content: '""',
      width: 0,
      height: 32,
      verticalAlign: 0
    }
  }
});

export default function Convered(props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [linesPlaying, setLinesPlaying] = useState([]);
  const classes = useStyles();
  const lines = props.lines;

  useEffect(() => {
    const linesPlaying = [];

    for (let i = 0; i < lines.length; i++) {
      if (i === lineIndex) {
        linesPlaying.push({showCursor: true, playing: true});
      } else {
        linesPlaying.push({showCursor: false, playing: false});
      }
    }

    setLinesPlaying(linesPlaying);
  }, [lines, lineIndex]);

  const lineElements = lines.map((line, index) => {
    let onLineCursorComplete;

    if (index === lines.length - 1) {
      onLineCursorComplete = () => {
        props.onComplete();
      }
    } else {
      onLineCursorComplete = () => {
        setLineIndex(prevLineIndex => prevLineIndex + 1);
      }
    }

    let top;
    let className = classes.line;

    if (index === 0) {
      className += " "+classes.topLine;
      top = 16;
    } else {
      top = 0;
    }

    let playing = false;

    if (linesPlaying[index]) {
      playing = linesPlaying[index].playing;
    }

    return (
      <div key={index} className={classes.lineContainer}>
        <div className={className}>{line}</div>
        <LineCursor 
          onComplete={onLineCursorComplete}
          playing={playing}
          top={top}/>
      </div>
    );
  });

  return (
    <div className={classes.root}>
      {lineElements}
    </div>
  );
};
