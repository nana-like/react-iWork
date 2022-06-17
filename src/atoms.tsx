import { atom } from 'recoil';

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'To do': [
      { id: 0, text: 'Be Happy!' },
      { id: 1, text: 'Smile :)' },
      { id: 2, text: 'Love yourself' }
    ],
    doing: [],
    done: []
  }
});
