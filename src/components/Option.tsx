import React, { useContext } from "react";
import { QuizContext } from "../providers/QuizMakerProvider";
import { OptionType } from "../providers/QuizMakerProvider";
import { actionType } from "../providers/QuizMakerEnums";

interface IOption {
  option: OptionType;
  questionIndex: number;
  index: number;
}

export const Option: React.FC<IOption> = ({option, questionIndex, index}) => {
  const {handleAction} = useContext(QuizContext);

  return (
    <div>
      <p>{option.text} {option.isCorrect ? "👍" : "👎"}</p>
      <div>
        <button onClick={() => {
          handleAction({
            type: actionType.SWITCH_CORRECT_OPTION,
            id: index,
            idQuestion: questionIndex
          });
        }}>Switch</button>
        <button onClick={() => {
          handleAction({
            type: actionType.REMOVE_OPTION,
            id: index,
            idQuestion: questionIndex
          });
        }}>Remove Option</button>
      </div>
    </div>
  );
}

export default Option;