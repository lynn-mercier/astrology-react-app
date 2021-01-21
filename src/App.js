import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import Button from '@material-ui/core/Button';
import CursorParagraph from './cursor-paragraph';
import ImageSection from './ImageSection';
import yangSvg from './yang.svg';
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
  },
  fourthSection: {
    marginTop: 8
  },
  fifthSection: {
    marginTop: 8,
    width: 'calc(100% - 32px)',
    marginLeft: 16,
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    alignSelf: 'flex-end',
    animation: '$fadeIn ease 1s'
  },
  '@keyframes fadeIn': {
    '0%': {opacity: 0},
    '100%': {opacity: 1}
  }
});

export default function App() {
  const [lastParagraphShowingIndex, setLastParagraphShowingIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const onParagraphComplete = () => {
    setTimeout(() => {
      setLastParagraphShowingIndex(prevLastParaShowingIndex => prevLastParaShowingIndex + 1);
    }, 1000);
  };

  const onLastParagraphComplete = () => {
    setTimeout(() => {
      setShowButton(true);
    }, 1000);
  }

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
          showCursor={lastParagraphShowingIndex <= 2}
          fullText="YANG energy is extroverted. It’s direct and outgoing. It’s active and giving. People with Yang energy are not stopped from doing/saying what they want to."
          onComplete={onParagraphComplete}
          />
      }
      {(lastParagraphShowingIndex > 2) &&
        <ImageSection
          className={classes.fourthSection}
          imageSrc={yinSvg}
          imageAlt="yin"
          showCursor={lastParagraphShowingIndex <= 3}
          fullText="YIN energy is introverted. It’s indirect and passive. It’s reactive and receptive. People with Yin energy are highly attuned to the world around them, and they act accordingly."
          onComplete={onParagraphComplete}
          />
      }
      {(lastParagraphShowingIndex > 3) && 
        <div className={classes.fifthSection}>
          <CursorParagraph
            showCursor={!showButton}
            fullText="The 12 signs can also be grouped as OBJECTIVITY and SUBJECTIVITY. Would you like to know more?"
            onComplete={onLastParagraphComplete}
            playing={true}
            />
          {showButton && 
            <Button className={classes.button}>Continue</Button>
          }
        </div>
      }
    </div>
  );
};
