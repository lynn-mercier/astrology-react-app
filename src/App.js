import {useState} from 'react';
import Paragraph from './Paragraph';

export default function App() {
  const [showSecondParagraph, setShowSecondParagraph] = useState(false); 

  const onParagraphComplete = () => {
    setShowSecondParagraph(true);
  }

  return (
    <div>
      <Paragraph 
        showCursor={!showSecondParagraph}
        fullText="Hi there. I want to tell you about astrology."
        onComplete={onParagraphComplete}/>
      {showSecondParagraph && 
        <Paragraph 
        showCursor={true}
        fullText="I’m sure you already know there are 12 signs. But did you know that half of those signs are YANG, and half are YIN?"
        onComplete={onParagraphComplete}/>}
    </div>
  );
};
