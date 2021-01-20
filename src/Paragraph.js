import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import Covered from './Covered';
import LineSplitter from './LineSplitter';


const useStyles = createUseStyles({
  root: {
    fontFamily: 'Roboto Mono'
  },
  lineSplitter: {
    width: 'calc(100% - 32px)',
    marginLeft: 16
  }
});

export default function Paragraph(props) {
  const [lineSplitterKey, setLineSplitterKey] = useState(0);
  const [fullText, setFullText] = useState(props.fullText);
  const [lines, setLines] = useState([]);

  const onLineSplit = (line) => {
    console.log(line);
    setLines(prevLins => lines.concat([line]));
    setFullText(fullText.replace(line, "").trim());

    if (fullText !== line) {
      setLineSplitterKey(lineSplitterKey + 1);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Covered showCursor={props.showCursor} lines={lines} onComplete={props.onComplete}/>
      <LineSplitter 
        className={classes.lineSplitter} 
        lineHeight={24}
        key={lineSplitterKey}
        fullText={fullText}
        onLineSplit={onLineSplit}/>
    </div>
  );
};
