import {createUseStyles} from 'react-jss';
import {useState} from 'react';
import LineCursor from './LineCursor';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginLeft: 16
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
  },
  bottomCover: {
    backgroundColor: '#FFF',
    width: 'calc(100% - 32px)',
    height: 24,
    position: 'absolute',
    top: 40
  }
});

export default function Convered() {
  const [coverBottom, setCoverBottom] = useState(true);
  const [lineCursorTop, setLineCursorTop] = useState(16);
  const [lineCursorKey, setLineCursorKey] = useState(0);
  const [showLineCursor, setShowLineCursor] = useState(true);

  const onLineCursorComplete = () => {
    setCoverBottom(false);
    setLineCursorTop(prevLineCursorTop => prevLineCursorTop + 24);

    if (coverBottom) {
      setLineCursorKey(prevLineCursorKey => prevLineCursorKey + 1);
    } else {
      setShowLineCursor(false);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paragraph}>
        Hi, I’m an A.I. trained to evaluate musical taste. To get started, I’ll need to see your Spotify.
      </div>
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
