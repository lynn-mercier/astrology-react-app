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
  }
});

export default function LineSplitter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paragraph}>
        Hi, I’m an A.I. trained to evaluate musical taste. To get started, I’ll need to see your Spotify.
      </div>
    </div>
  );
};
