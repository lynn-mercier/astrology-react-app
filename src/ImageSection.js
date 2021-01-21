import {useState} from 'react';
import {createUseStyles} from 'react-jss';
import CursorParagraph from './cursor-paragraph';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  svg: {
    width: 'calc(25% - 14px)',
    marginLeft: 16,
    animation: '$fadeIn ease 1s',
    marginTop: 24,
  },
  paragraph: {
    width: 'calc(75% - 30px)',
    marginLeft: 8,
  },
  paragraphHidden: {
    visibility: 'hidden'
  },
  '@keyframes fadeIn': {
    '0%': {opacity: 0},
    '100%': {opacity: 1}
  },
});

export default function ImageSection(props) {
  const [showParagraph, setShowParagraph] = useState(false);

  setTimeout(() => {
    setShowParagraph(true);
  }, 1000);

  const classes = useStyles();
  let paragraphClass = classes.paragraph;

  if (!showParagraph) {
    paragraphClass += " "+classes.paragraphHidden;
  }

  const className = classes.root+" "+props.className;

  return (
    <div className={className}>
      <img src={props.imageSrc} alt={props.imageAlt} className={classes.svg}/>
      <CursorParagraph
        className={paragraphClass} 
        showCursor={true}
        fullText={props.fullText}
        onComplete={() => {}}
        playing={showParagraph}/>
    </div>
  );
};
