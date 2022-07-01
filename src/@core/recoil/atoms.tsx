import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface ICard {
  id: number;
  text: string;
}
export interface IWorkBoardProps {
  title: string;
  content: ICard[];
}

/**
 * 객체는 순서를 기억하지 못한다.
  {보드1:[], 보드2:[], 보드3:[]} 일 때 보드1과 보드3의 위치를 바꾸는 건 매우 복잡하다.

 * 배열은 순서를 기억하지만 접근이 어렵다.
  [{title:보드1, content:[]}, {title:보드2, content:[]}]
 */

export const IWorkBoardState = atom<Array<IWorkBoardProps>>({
  key: 'IWorkBoard',
  // effects_UNSTABLE: [persistAtom],
  default: [
    {
      title: '첫 번째 보드',
      content: [
        {
          id: 0,
          text: '나의 첫 번째 카드'
        },
        {
          id: 1,
          text: '두 번째 카드 나는야 나나 나는 나나'
        },
        {
          id: 2,
          text: '카드1-3'
        },
        {
          id: 3,
          text: '카드1-4'
        }
      ]
    },
    {
      title: '두 번째 보드보드',
      content: [
        {
          id: 0,
          text: '카드2-1'
        },
        {
          id: 1,
          text: '카드2-2'
        }
      ]
    },
    {
      title: '3번째 보드보드보드',
      content: [
        {
          id: 0,
          text: '카드3-1'
        }
      ]
    }
  ]
});

export const IWorkCardState = atom({
  key: 'IWorkCard',
  default: {
    id: 0,
    text: '카드1-1'
  }
});

/////////////////////////////

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const BoardState = atom<string[]>({
  key: 'board',
  default: ['TODAY', 'TOMORROW'],
  effects_UNSTABLE: [persistAtom]
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
  },
  effects_UNSTABLE: [persistAtom]
});

export const toDoStateSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {},
  set: ({ set }, newValue) => {
    console.log(newValue);
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
