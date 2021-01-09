
import {createUseStyles} from 'react-jss';

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
  },
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

function App() {
  const classes = useStyles();
  const cursorLeft = 10;
  const rightCoverWidthSubtraction = 32 + cursorLeft;

  const rightCoverStyle = {
    width: "calc(100% - "+rightCoverWidthSubtraction+"px)",
    left: cursorLeft
  };

  const cursorStyle = {
    left: cursorLeft
  };
  
  return (
    <div className={classes.root}>
      <div className={classes.paragraph}>
        Hi, I’m an A.I. trained to evaluate musical taste. To get started, I’ll need to see your Spotify.
      </div>
      <div className={classes.bottomCover}/>
      <div 
        className={classes.rightCover}
        style={rightCoverStyle}/>
      <div 
        className={classes.cursor}
        style={cursorStyle}/>
    </div>
  );
}

export default App;
