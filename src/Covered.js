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
  },
  bottomCover: {
    backgroundColor: '#FFF',
    width: 'calc(100% - 32px)',
    position: 'absolute',
    top: 40
  }
});

export default function Convered(props) {
  const [bottomCoverHeight, setBottomCoverHeight] = useState(24);
  const [coverBottom, setCoverBottom] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [linesStatus, setLinesStatus] = useState([]);
  const classes = useStyles();
  const lines = props.lines;

  useEffect(() => {
    const linesStatusTmp = [];

    for (let i = 0; i < lines.length; i++) {
      if (i === lineIndex) {
        linesStatusTmp.push({showCursor: true, playing: true});
      } else {
        linesStatusTmp.push({showCursor: false, playing: false});
      }
    }

    setLinesStatus(linesStatusTmp);
  }, [lines, lineIndex]);

  const lineElements = lines.map((line, index) => {
    let onLineCursorComplete;
    let top;
    let className = classes.line;

    if (index === 0) {
      className += " "+classes.topLine;

      onLineCursorComplete = () => {
        setLineIndex(prevLineIndex => prevLineIndex + 1);
        setCoverBottom(false);
      }

      top = 16;
    } else {
      onLineCursorComplete = () => {
        // setLinesStatus([
        //   {showCursor: false, playing: false}, 
        //   {showCursor: true, playing: false}
        // ]);
      }

      top = 0;
    }

    let showCursor = false;
    let playing = false;

    if (linesStatus[index]) {
      showCursor = linesStatus[index].showCursor;
      playing = linesStatus[index].playing;
    }

    return (
      <div key={index} className={classes.lineContainer}>
        <div className={className}>{line}</div>
        <LineCursor 
          onComplete={onLineCursorComplete}
          showCursor={showCursor}
          playing={playing}
          top={top}/>
      </div>
    );
  });

  return (
    <div className={classes.root}>
      {lineElements}
      {coverBottom &&
        <div className={classes.bottomCover} style={{height: bottomCoverHeight}}/>
      }
    </div>
  );
};
