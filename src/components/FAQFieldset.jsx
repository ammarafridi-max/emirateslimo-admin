import Input from './FormElements/Input';
import Textarea from './FormElements/Textarea';
import PrimaryButton from './Buttons/PrimaryButton';
import { useEffect, useRef, useState } from 'react';

export default function FAQFieldset({ onSubmit }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  function clear() {
    setQuestion('');
    setAnswer('');
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Textarea
        rows={4}
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <PrimaryButton
        onClick={() => {
          onSubmit({ question, answer });
          setQuestion('');
          setAnswer('');
        }}
        type="button"
      >
        Add
      </PrimaryButton>
    </div>
  );
}
