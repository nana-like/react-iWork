import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface ICard {
  id: number;
  text: string;
}
export interface IBoard {
  title: string;
  content: ICard[];
}

export const IWorkBoardState = atom<Array<IBoard>>({
  key: 'IWorkBoard',
  effects_UNSTABLE: [persistAtom],
  default: [
    {
      title: '사고 싶은 것',
      content: [
        {
          id: 0,
          text: '파슬리'
        },
        {
          id: 1,
          text: '세이지'
        },
        {
          id: 2,
          text: '로즈메리'
        },
        {
          id: 3,
          text: '타임'
        }
      ]
    },
    {
      title: '투두리스트 😎',
      content: [
        {
          id: 0,
          text: '강의 듣기'
        },
        {
          id: 1,
          text: '배운 내용 정리하기'
        }
      ]
    },
    {
      title: '인강 목록',
      content: [
        {
          id: 0,
          text: 'React JS 마스터 클래스'
        }
      ]
    }
  ]
});
