import { atom } from 'recoil';

interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const BoardState = atom<string[]>({
  key: 'board',
  default: ['TODAY']
});

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    TODAY: [
      {
        id: 0,
        text: 'Hello!'
      }
    ]
  }
});

// import { atom } from 'recoil';
// import { recoilPersist } from 'recoil-persist';
// const { persistAtom } = recoilPersist();

// export interface IToDo {
//   id: number;
//   text: string;
// }

// interface IToDoState {
//   [key: string]: IToDo[];
// }

// export const toDoState = atom<IToDoState>({
//   key: 'toDo',
//   default: {
//     'To do': [
//       { id: 0, text: 'Be Happy!' },
//       { id: 1, text: 'Smile :)' },
//       { id: 2, text: 'Love yourself' }
//     ],
//     doing: [],
//     done: []
//   },
//   effects_UNSTABLE: [persistAtom]
// });
