import {useState, useEffect} from 'react';
import Covered from './Covered';
import LineSplitter from './LineSplitter';

export default function App() {
  const [lineSplitterKey, setLineSplitterKey] = useState(0);
  const [fullText, setFullText] = 
    useState("Hi, I’m an A.I. trained to evaluate musical taste. To get started, I’ll need to see your Spotify.");
  const [lines, setLines] = useState([]);

  const onLineSplit = (line) => {
    setLines(prevLins => lines.concat([line]));
    setFullText(fullText.replace(line, "").trim());

    if (fullText !== line) {
      setLineSplitterKey(lineSplitterKey + 1);
    }
  };

  return (
    <div>
      <Covered lines={lines}/>
      <LineSplitter key={lineSplitterKey} fullText={fullText} onLineSplit={onLineSplit}/>
    </div>
  );
};
