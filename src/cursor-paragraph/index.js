import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import Covered from './Covered';
import LineSplitter from './LineSplitter';


const useStyles = createUseStyles({
  root: {
    fontFamily: 'Roboto Mono'
  }
});

export default function CursorParagraph(props) {
  const [lineSplitterKey, setLineSplitterKey] = useState(0);
  const [fullText, setFullText] = useState(props.fullText);
  const [lines, setLines] = useState([]);

  const onLineSplit = (line) => {
    if (line.trim() === "") {
      return;
    }
    
    console.log(line);
    setLines(prevLins => lines.concat([line]));
    setFullText(fullText.replace(line, "").trim());

    if (fullText !== line) {
      setLineSplitterKey(lineSplitterKey + 1);
    }
  };

  const classes = useStyles();
  const className = classes.root+" "+props.className;

  return (
    <div className={className}>
      <Covered 
        showCursor={props.showCursor} 
        lines={lines} 
        onComplete={props.onComplete}
        playing={props.playing}/>
      <LineSplitter
        lineHeight={24}
        key={lineSplitterKey}
        fullText={fullText}
        onLineSplit={onLineSplit}/>
    </div>
  );
};
