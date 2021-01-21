import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import Paragraph from './Paragraph';
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
  thirdParagraph: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 8
  },
  yinSvg: {
    width: 'calc(25% - 14px)',
    marginLeft: 16,
    animation: '$fadeIn ease 1s',
    marginTop: 24,
  },
  yinCopy: {
    width: 'calc(75% - 30px)',
    marginLeft: 8,
    //lineHeight: '24px',
  },
  yinCopyHidden: {
    visibility: 'hidden'
  },
  '@keyframes fadeIn': {
    '0%': {opacity: 0},
    '100%': {opacity: 1}
  },
});

export default function App() {
  const [showSecondParagraph, setShowSecondParagraph] = useState(false);
  const [showThirdSection, setShowThirdSection] = useState(false);
  const [showThirdParagraph, setShowThirdParagraph] = useState(false);

  const onFirstParagraphComplete = () => {
    setTimeout(() => {
      setShowSecondParagraph(true);
    }, 1000);
  }

  const onSecondParagraphComplete = () => {
    setTimeout(() => {
      setShowThirdSection(true);

      setTimeout(() => {
        setShowThirdParagraph(true);
      }, 1000);
    }, 1000);
  }

  const classes = useStyles();
  let yinCopyClass = classes.yinCopy;

  if (!showThirdParagraph) {
    yinCopyClass += " "+classes.yinCopyHidden;
  }

  return (
    <div>
      <Paragraph
        className={classes.firstParagraph} 
        showCursor={!showSecondParagraph}
        fullText="Hi there. I want to tell you about astrology."
        onComplete={onFirstParagraphComplete}
        playing={true}/>
      {showSecondParagraph && 
        <Paragraph 
        className={classes.secondParagraph} 
        showCursor={!showThirdSection}
        fullText="I’m sure you already know there are 12 signs. But did you know that half of those signs are YANG, and half are YIN?"
        onComplete={onSecondParagraphComplete}
        playing={true}/>}
      {showThirdSection &&
        <div className={classes.thirdParagraph}>
          <img src={yinSvg} alt="yin" className={classes.yinSvg}/>
          <Paragraph
            className={yinCopyClass} 
            showCursor={true}
            fullText="YANG energy is extroverted. It’s direct and outgoing. It’s active and giving. People with Yang energy are not stopped from doing/saying what they want to."
            onComplete={() => {}}
            playing={showThirdParagraph}/>
        </div>
      }
    </div>
  );
};
