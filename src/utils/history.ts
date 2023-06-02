import { NavigateFunction } from "react-router-dom";

interface History {
  navigate: null | NavigateFunction;
}

export const history: History = {
  navigate: null,
};
