import {createUseStyles} from 'react-jss';
import {useState} from 'react';
import LineCursor from './LineCursor';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginLeft: 16
  },
  line: {
    fontFamily: 'Roboto Mono',
    lineHeight: '24px',
    width: 'calc(100% - 32px)',
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
  const [lineCursorTop, setLineCursorTop] = useState(16);
  const [lineCursorKey, setLineCursorKey] = useState(0);
  const [showLineCursor, setShowLineCursor] = useState(true);
  const classes = useStyles();

  const lineElements = props.lines.map((line, index) => {
    let className = classes.line;

    if (index === 0) {
      className += " "+classes.topLine;
    }

    return (<div key={index} className={className}>{line}</div>);
  });

  const onLineCursorComplete = () => {
    setCoverBottom(false);
    setLineCursorTop(prevLineCursorTop => prevLineCursorTop + 24);

    if (coverBottom) {
      setLineCursorKey(prevLineCursorKey => prevLineCursorKey + 1);
    } else {
      setShowLineCursor(false);
    }
  };

  return (
    <div className={classes.root}>
      {lineElements}
      {showLineCursor && 
        <LineCursor 
          onComplete={onLineCursorComplete}
          top={lineCursorTop}
          key={lineCursorKey}/>
      }
      {coverBottom &&
        <div className={classes.bottomCover}/>
      }
    </div>
  );
};
