import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import Paragraph from './Paragraph';
import yinSvg from './yin.svg';

const useStyles = createUseStyles({
  thirdParagraph: {
    display: 'flex'
  },
  yinSvg: {
    width: 'calc(25% - 14px)',
    marginLeft: 16,
    animation: '$fadeIn ease 1s'
  },
  yinCopy: {
    width: 'calc(75% - 30px)',
    marginLeft: 8,
    lineHeight: '24px',
    fontFamily: 'Roboto Mono',
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
        showCursor={!showSecondParagraph}
        fullText="Hi there. I want to tell you about astrology."
        onComplete={onFirstParagraphComplete}/>
      {showSecondParagraph && 
        <Paragraph 
        showCursor={true}
        fullText="I’m sure you already know there are 12 signs. But did you know that half of those signs are YANG, and half are YIN?"
        onComplete={onSecondParagraphComplete}/>}
      {showThirdSection &&
        <div className={classes.thirdParagraph}>
          <img src={yinSvg} alt="yin" className={classes.yinSvg}/>
          <div className={yinCopyClass}>
            YANG energy is extroverted. It’s direct and outgoing. It’s active and giving. People with Yang energy are not stopped from doing/saying what they want to.
          </div>
        </div>
      }
    </div>
  );
};
