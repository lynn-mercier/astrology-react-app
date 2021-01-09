
import {createUseStyles} from 'react-jss';


const useStyles = createUseStyles({
  paragraph: {
    fontFamily: 'Roboto Mono',
    lineHeight: '24px',
    width: 'calc(100% - 32px)',
    marginLeft: 16,
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
});

function App() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.paragraph}>
        Hi, I’m an A.I. trained to evaluate musical taste. To get started, I’ll need to see your Spotify.
      </div>
      <div className={classes.paragraph}>
        I’m just gonna look at what you listen to. I won’t post or change anything
      </div>
    </div>
  );
}

export default App;
