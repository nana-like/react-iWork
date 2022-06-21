import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Board from './@component/Board';
import { BoardState, toDoState } from './@core/recoil/atoms';

function App() {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();
  const [boards, setBoards] = useRecoilState(BoardState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const handleBoards = ({ board }: any) => {
    // if (board) {
    //   setError(
    //     'board',
    //     { message: '이미 존재하는 보드명입니다.' },
    //     { shouldFocus: true }
    //   );
    // }
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards, board];
      return newBoards;
    });
    setToDos((oldToDos: any) => {
      return {
        ...oldToDos,
        [board]: []
      };
    });
    setValue('board', '');
  };

  return (
    <>
      <h1>iWork</h1>
      <br />
      <h2>Create a board</h2>
      <form onSubmit={handleSubmit(handleBoards)}>
        <input
          {...register('board', {
            required: true,
            validate: (value) =>
              !boards.some((board) => board.includes(value)) || '중복입니당'
          })}
          type="text"
          placeholder="New Board"
        />
        <p style={{ color: 'red' }}>{errors?.board?.message}</p>
        <button type="submit">+ New</button>
      </form>
      <div>
        {boards.map((board, index) => (
          <Board key={index} id={index} board={board} />
        ))}
      </div>
    </>
  );
}

export default App;
