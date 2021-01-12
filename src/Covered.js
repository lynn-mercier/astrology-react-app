import {createUseStyles} from 'react-jss';
import {useState} from 'react';
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
    fontFamily: 'Roboto Mono',
    lineHeight: '24px',
    display: 'inline-block',
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
    height: 24,
    position: 'absolute',
    top: 40
  }
});

export default function Convered(props) {
  const [coverBottom, setCoverBottom] = useState(true);
  const [showCursorTopLine, setShowCursorTopLine] = useState(true);
  const [playingTopLine, setPlayingTopLine] = useState(true);
  const [showCursorBottomLine, setShowCursorBottomLine] = useState(false);
  const [playingBottomLine, setPlayingBottomLine] = useState(false);
  const classes = useStyles();

  const lineElements = props.lines.map((line, index) => {
    let onLineCursorComplete;
    let showCursor;
    let playing;
    let top;
    let className = classes.line;

    if (index === 0) {
      className += " "+classes.topLine;

      onLineCursorComplete = () => {
        setCoverBottom(false);
        setShowCursorTopLine(false);
        setPlayingTopLine(false);
        setShowCursorBottomLine(true);
        setPlayingBottomLine(true);
      }

      showCursor = showCursorTopLine;
      playing = playingTopLine;
      top = 16;
    } else {
      onLineCursorComplete = () => {
        setPlayingBottomLine(false);
      }

      showCursor = showCursorBottomLine;
      playing = playingBottomLine;
      top = 0;
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
        <div className={classes.bottomCover}/>
      }
    </div>
  );
};
