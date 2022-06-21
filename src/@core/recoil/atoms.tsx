import { atom } from 'recoil';

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const BoardState = atom<string[]>({
  key: 'board',
  default: ['TODAY', 'TOMORROW']
});

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    TODAY: [
      {
        id: 0,
        text: 'Hello!'
      }
    ],
    TOMORROW: [
      {
        id: 0,
        text: 'hehehe!'
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
