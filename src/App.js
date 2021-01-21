import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import CursorParagraph from './cursor-paragraph';
import ImageSection from './ImageSection';
import yinSvg from './yin.svg';

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
  const [showSecondParagraph, setShowSecondParagraph] = useState(false);
  const [showThirdSection, setShowThirdSection] = useState(false);

  const onFirstParagraphComplete = () => {
    setTimeout(() => {
      setShowSecondParagraph(true);
    }, 1000);
  }

  const onSecondParagraphComplete = () => {
    setTimeout(() => {
      setShowThirdSection(true);
    }, 1000);
  }

  const classes = useStyles();

  return (
    <div>
      <CursorParagraph
        className={classes.firstParagraph} 
        showCursor={!showSecondParagraph}
        fullText="Hi there. I want to tell you about astrology."
        onComplete={onFirstParagraphComplete}
        playing={true}/>
      {showSecondParagraph && 
        <CursorParagraph 
          className={classes.secondParagraph} 
          showCursor={!showThirdSection}
          fullText="I’m sure you already know there are 12 signs. But did you know that half of those signs are YANG, and half are YIN?"
          onComplete={onSecondParagraphComplete}
          playing={true}/>
      }
      {showThirdSection &&
        <ImageSection
          className={classes.thirdSection}
          imageSrc={yinSvg}
          imageAlt="yin"
          fullText="YANG energy is extroverted. It’s direct and outgoing. It’s active and giving. People with Yang energy are not stopped from doing/saying what they want to."
          />
      }
    </div>
  );
};
