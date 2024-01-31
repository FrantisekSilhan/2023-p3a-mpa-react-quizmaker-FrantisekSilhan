import React, { PropsWithChildren, useReducer } from "react";
import { actionType } from "./QuizMakerEnums";

export type QuizType = { // celý quiz
  questions: QuestionType[];
};

export type OptionType = { // odpověď
  text: string; // znění odpovědi
  isCorrect: boolean; // je odpověď správná
};

export type QuestionType = { // otázka
  text: string; // znění otázky
  options: OptionType[]; // možné odpovědi
}

export type QuizAction = {
  type: actionType.ADD_QUESTION;
  text: string; // znění otázky
} | {
  type: actionType.ADD_OPTION;
  id: number; // id otázky
  text: string; // znění odpovědi
  isCorrect: boolean;
} | {
  type: actionType.CLEAR_QUIZ;
} | {
  type: actionType.REMOVE_OPTION;
} | {
  type: actionType.REMOVE_QUESTION;
} | {
  type: actionType.SWITCH_CORRECT_OPTION;
}

const reducer = (state: QuizType, action: QuizAction) => {
  switch (action.type) {
    case actionType.ADD_QUESTION:
      return state;
    case actionType.ADD_OPTION:
      return state;
    case actionType.CLEAR_QUIZ:
      return state;
    case actionType.REMOVE_OPTION:
      return state;
    case actionType.REMOVE_QUESTION:
      return state;
    case actionType.SWITCH_CORRECT_OPTION:
      return state;
  }
}

const initialQuiz: QuizType = {
  questions: [
    {
      text: "otázka 1",
      options: [
        {
          text: "správná odpověď 1",
          isCorrect: false
        },
        {
          text: "špatná odpověď 1",
          isCorrect: true
        }
      ]
    },
    {
      text: "otázka 2",
      options: [
        {
          text: "špatná odpověď 2",
          isCorrect: true
        },
        {
          text: "správná odpověď 2",
          isCorrect: false
        }
      ]
    }
  ]
}

export const QuizMakerProvider: React.FC<PropsWithChildren> = () => {
  const [quiz, dispatch] = useReducer(reducer, initialQuiz);

  return (
    <>

    </>
  );
}

export default QuizMakerProvider;