import Paragraph from './Paragraph';

export default function App() {
  const onParagraphComplete = () => {
    console.log("Paragraph completed");
  }

  return (
    <div>
      <Paragraph 
        fullText="Hi, I’m an A.I. trained to evaluate musical taste. To get started, I’ll need to see your Spotify."
        onComplete={onParagraphComplete}/>
    </div>
  );
};
