import React, { useContext, useId, useRef } from "react";
import { QuizContext } from "../providers/QuizMakerProvider";
import { QuestionType } from "../providers/QuizMakerProvider"
import { actionType } from "../providers/QuizMakerEnums";
import Option from "./Option";

interface IQuestion {
  question: QuestionType;
  index: number;
}

export const Question: React.FC<IQuestion> = ({ question, index }) => {
  const {handleAction} = useContext(QuizContext);
  const textRef = useRef<HTMLInputElement>(null);
  const textRefId = useId();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const checkboxRefId = useId();

  return (
    <>
      <p><b>{question.text}</b></p>
      {question.options.map((o, i) => {
        return <Option option={o} index={i} questionIndex={index} />
      })}

      <div>
        <p>Add Option</p>
        <div>
          <label htmlFor={textRefId}>Option text:</label>
          <input id={textRefId} ref={textRef} type="text"></input>
        </div>
        <div>
          <label htmlFor={checkboxRefId}>Correct?</label>
          <input id={checkboxRefId} ref={checkboxRef} type="checkbox"></input>
        </div>
        <button onClick={() => {handleAction({
          type: actionType.ADD_OPTION,
          id: index,
          isCorrect: Boolean(checkboxRef.current?.checked),
          text: textRef.current?.value ?? ""
        })}}>Add Option</button>
      </div>

      <button onClick={() => {handleAction({
        type: actionType.REMOVE_QUESTION,
        id: index,
      })}}>Remove Question</button>
    </>
  );
}

export default Question;