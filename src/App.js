import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import CursorParagraph from './cursor-paragraph';
import ImageSection from './ImageSection';
import yangSvg from './yang.svg';

const useStyles = createUseStyles({
  firstParagraph: {
    width: 'calc(100% - 32px)',
    marginLeft: 16
  },
  secondParagraph: {
    width: 'calc(100% - 32px)',
    marginLeft: 16
  },
  thirdSection: {
    marginTop: 8
  }
});

export default function App() {
  const [lastParagraphShowingIndex, setLastParagraphShowingIndex] = useState(0);

  const onParagraphComplete = () => {
    setTimeout(() => {
      setLastParagraphShowingIndex(prevLastParaShowingIndex => prevLastParaShowingIndex + 1);
    }, 1000);
  };

  const classes = useStyles();

  return (
    <div>
      <CursorParagraph
        className={classes.firstParagraph} 
        showCursor={lastParagraphShowingIndex <= 0}
        fullText="Hi there. I want to tell you about astrology."
        onComplete={onParagraphComplete}
        playing={true}
        />
      {(lastParagraphShowingIndex > 0) && 
        <CursorParagraph 
          className={classes.secondParagraph} 
          showCursor={lastParagraphShowingIndex <= 1}
          fullText="I’m sure you already know there are 12 signs. But did you know that half of those signs are YANG, and half are YIN?"
          onComplete={onParagraphComplete}
          playing={true}
          />
      }
      {(lastParagraphShowingIndex > 1) &&
        <ImageSection
          className={classes.thirdSection}
          imageSrc={yangSvg}
          imageAlt="yang"
          fullText="YANG energy is extroverted. It’s direct and outgoing. It’s active and giving. People with Yang energy are not stopped from doing/saying what they want to."
          />
      }
    </div>
  );
};
