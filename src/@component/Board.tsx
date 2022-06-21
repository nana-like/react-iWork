import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BoardState, toDoState } from '../@core/recoil/atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import ToDoCard from './ToDoCard';

const Board = ({ id, board }: any) => {
  const [boards, setBoards] = useRecoilState(BoardState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boardName, setBoardName] = useState(board);
  const { register, setValue, handleSubmit } = useForm();
  useEffect(() => {
    setBoardName(board);
  }, [board]);

  const handleBoardName = () => {
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards];
      newBoards.splice(id, 1, boardName); //board state가 변경됨
      return newBoards;
    });
    setToDos((oldToDos: any) => {
      const oldToDo = [...oldToDos[board]];
      return {
        ...oldToDos,
        [boardName]: oldToDo
      };
    });
  };

  const handleBoardDelete = () => {
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards];
      newBoards.splice(id, 1);
      return newBoards;
    });
    console.log(toDos);
  };

  const handleNewToDo = ({ toDo }: any) => {
    console.log(toDo);
    setToDos((oldToDos) => {
      const newToDo = {
        id: Date.now(),
        text: toDo
      };
      setValue('toDo', '');

      console.log('---', boards);
      console.log('---', toDos);

      return {
        ...oldToDos,
        [board]: [...oldToDos[board], newToDo]
      };
    });
  };

  return (
    <Wrapper>
      <BoardTitle>
        board: {board} | id: {id}
      </BoardTitle>

      {/* 보드 삭제 */}
      <button type="button" onClick={handleBoardDelete}>
        ❌
      </button>

      <div>
        {/* 보드 이름 변경 */}
        <input
          type="text"
          onChange={(e) => {
            setBoardName(e.currentTarget.value);
          }}
          value={boardName}
        />
        <button type="button" onClick={handleBoardName}>
          Done
        </button>
      </div>

      <hr />

      <div>
        {/* 보드에 투두 추가 */}
        <form onSubmit={handleSubmit(handleNewToDo)}>
          <input {...register('toDo')} type="text" placeholder="New ToDo" />
          <button type="submit">Add</button>
        </form>
      </div>

      <div>
        {/* 보드 내 투두 목록 */}
        {toDos[board]?.map((toDo) => (
          <ToDoCard key={toDo.id} board={board} id={toDo.id} text={toDo.text} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const BoardTitle = styled.h2`
  display: inline-block;
  font-size: 1.6rem;
  background-color: #ffd6d6;
`;
