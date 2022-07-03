import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IWorkBoardState } from '../@core/recoil/atoms';

const IWorkCreateBoard = () => {
  const [boardList, setBoardList] = useRecoilState(IWorkBoardState);
  const { register, setValue, handleSubmit } = useForm();
  const createBoard = ({ createBoard }: { [x: string]: string }) => {
    if (!createBoard) return;
    if (boardList.find(({ title }) => title === createBoard)) return;
    setBoardList((oldBoardList) => {
      const copied = [...oldBoardList];
      const newBoard = {
        title: createBoard,
        content: []
      };
      return [...copied, newBoard];
    });
    setValue('createBoard', '');
  };
  return (
    <Creator>
      <strong>
        Create a new board <em>☞</em>
      </strong>
      <form onSubmit={handleSubmit(createBoard)}>
        <input
          {...register('createBoard')}
          type="text"
          placeholder="Type board name here and press enter to create"
        />
      </form>
    </Creator>
  );
};

export default IWorkCreateBoard;

const Creator = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem 1rem;
  margin-bottom: 3rem;
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.07rem;
  border-bottom: 1px solid #111;

  strong {
    flex-shrink: 0;

    em {
      display: inline-block;
      margin-left: 1.2rem;
      transform: scale(1.8) translate3d(0, 0.1rem, 0);
    }
  }

  form {
    width: 100%;
    margin-left: 1.6rem;

    input {
      width: 100%;
      padding: 0.6rem 1.4rem;
      font-size: 2.2rem;
      font-weight: 500;
      letter-spacing: 0.01rem;
      /* background-color: #fff; */
      /* border-bottom: 2px solid #111; */
      /* background-color: transparent; */
      background-color: #e9e9e9;
      background-color: #ddd;
      /* border: 1px solid #111; */
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &::placeholder {
        overflow: hidden;
        text-overflow: ellipsis;
        /* font-size: 1.8rem; */
        color: #999;
        /* font-style: italic; */
      }
    }
  }
`;
