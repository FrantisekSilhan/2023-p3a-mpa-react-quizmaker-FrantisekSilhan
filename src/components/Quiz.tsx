import { useContext, useRef, useId } from "react";
import { QuizContext } from "../providers/QuizMakerProvider";
import Question from "./Question";
import { actionType } from "../providers/QuizMakerEnums";

export const Quiz: React.FC = () => {
  const {quiz, handleAction} = useContext(QuizContext);
  const textRef = useRef<HTMLInputElement>(null);
  const textRefId = useId();

  return (
    <>
      <button onClick={() => {
        handleAction({type: actionType.CLEAR_QUIZ});
      }}>Clear Quiz</button>
      {quiz.questions.map((q, i) => {
        return <Question question={q} index={i} />
      })}
      <div>
        <p>Add Question</p>
        <label htmlFor={textRefId}>Question text:</label>
        <input ref={textRef} id={textRefId} type="text"></input>
        <button onClick={() => {
          handleAction({
            type: actionType.ADD_QUESTION,
            text: textRef.current?.value ?? ""
          });
        }}>Add Question</button>
      </div>
    </>
  );
}

export default Quiz;