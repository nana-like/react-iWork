import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Board from './@component/Board';
import { BoardState } from './@core/recoil/atoms';

function App() {
  const { register, setValue, handleSubmit } = useForm();
  const [boards, setBoards] = useRecoilState(BoardState);
  const handleBoards = (data: any) => {
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards, data.board];
      return newBoards;
    });
    setValue('board', '');
  };

  return (
    <>
      <h1>iWork</h1>
      <br />
      <h2>Create a board</h2>
      <form onSubmit={handleSubmit(handleBoards)}>
        <input {...register('board')} type="text" placeholder="Type a name..." />
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
