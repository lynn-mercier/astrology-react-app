
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  root: {
    backgroundColor: '#C4C4C4',
    width: 10,
    height: 18,
    position: 'absolute'
  }
});

export default function Cursor(props) {
  const cursorStyle = {
    left: props.left,
    top: props.top+3
  };

  const classes = useStyles();

  return (
    <div 
      className={classes.root}
      style={cursorStyle}/>
  );
};
