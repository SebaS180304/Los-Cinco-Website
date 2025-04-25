import React, { useState, useEffect } from 'react';
import QuizContent from './QuizContent';
import QuizSummary from './QuizSummary';

const QuizContainer = ({ questions, onQuizComplete, isLectureComplete }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  
  const question = questions[current];

  const handleSubmit = () => {
    const wasCorrect = question?.opciones[selected]?.correcta;
    setIsCorrect(wasCorrect);
    setSubmitted(true);
  };

  const handleNext = async () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setSubmitted(false);
      setIsCorrect(false);
    } else {
      setFinished(true);
      // Llamar a onQuizComplete solo cuando se completa todo el quiz
      if (onQuizComplete) {
        await onQuizComplete();
      }
    }
  };

  const handleTryAgain = () => {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    if (isLectureComplete) {
      setFinished(true);
    }
  }, [isLectureComplete]);

  return finished ? (
    <QuizSummary questions={questions}/>
  ) : (
    <QuizContent
      question={question}
      current={current}
      total={questions.length}
      selected={selected}
      submitted={submitted}
      isCorrect={isCorrect}
      onSelect={setSelected}
      onSubmit={handleSubmit}
      onNext={handleNext}
      onTryAgain={handleTryAgain}
    />
  );
};

export default QuizContainer;