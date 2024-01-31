import React, { PropsWithChildren, createContext, useReducer } from "react";
import { actionType } from "./QuizMakerEnums";

export type QuizType = { // celý quiz
  questions: QuestionType[];
};

export type OptionType = { // odpověď
  id: number;
  text: string; // znění odpovědi
  isCorrect: boolean; // je odpověď správná
};

export type QuestionType = { // otázka
  id: number;
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
  idQuestion: number; // id otázky
  id: number; // id odpovědi
} | {
  type: actionType.REMOVE_QUESTION;
  id: number; // id otázky
} | {
  type: actionType.SWITCH_CORRECT_OPTION;
  idQuestion: number; // id otázky
  id: number; // id odpovědi
}

const reducer = (state: QuizType, action: QuizAction) => {
  switch (action.type) {
    case actionType.ADD_QUESTION:
      return {
        ...state,
        questions: [
          ...state.questions,
          {
            id: state.questions.length,
            text: action.text,
            options: []
          }
        ]
      };
    case actionType.ADD_OPTION:
      return {
        ...state,
        questions: [
          ...state.questions.map((q) => {
              if (q.id === action.id) {
                return {
                  ...q,
                  options: [
                    ...q.options,
                    {
                      id: q.options.length,
                      isCorrect: action.isCorrect,
                      text: action.text
                    }
                  ]
                };
              }
              return q;
          })
        ]
      };
    case actionType.CLEAR_QUIZ:
      return {questions: []};
    case actionType.REMOVE_OPTION:
      return {
        ...state,
        questions: [
          ...state.questions.map((q) => {
            if (q.id === action.idQuestion) {
              return {
                ...q,
                options: [
                  ...q.options.filter((o) => {
                    return o.id !== action.id;
                  })
                ]
              };
            }
            return q;
          })
        ]
      };
    case actionType.REMOVE_QUESTION:
      return {
        ...state,
        questions: [
          ...state.questions.filter((q) => {
            return q.id !== action.id;
          })
        ]
      };
    case actionType.SWITCH_CORRECT_OPTION:
      return {
        ...state,
        questions: state.questions.map((q, i) => {
          if (i === action.idQuestion) {
            return {
              ...q,
              options: q.options.map((o, j) => {
                if (j === action.id) {
                  return {
                    ...o,
                    isCorrect: !o.isCorrect,
                  };
                }
                return o;
              }),
            };
          }
          return q;
        }),
      };
  }
}

const initialQuiz: QuizType = {
  questions: []
}

type QuizContextT = {
  quiz: QuizType;
  handleAction: (action: QuizAction) => void;
}

export const QuizContext = createContext<QuizContextT>({quiz: initialQuiz, handleAction: () => {}});

export const QuizMakerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [quiz, dispatch] = useReducer(reducer, initialQuiz);

  const handleAction = (action: QuizAction) => {
    dispatch(action);
  }

  return (
    <>
      <QuizContext.Provider value={{ quiz, handleAction }}>
        {children}
      </QuizContext.Provider>
    </>
  );
}

export default QuizMakerProvider;