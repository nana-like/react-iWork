import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BoardState, toDoState } from '../@core/recoil/atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import ToDoCard from './ToDoCard';
import { IToDoState } from './../@core/recoil/atoms';

const Board = ({ id, board }: any) => {
  const [boards, setBoards] = useRecoilState(BoardState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boardName, setBoardName] = useState(board);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const {
    register: boardNameRegister,
    handleSubmit: boardNameSubmit,
    formState: { errors: boardNameErrors }
  } = useForm();
  useEffect(() => {
    setBoardName(board);
  }, [board]);

  const handleBoardName = () => {
    if (!boardName) return;
    if (board === boardName) return;
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards];
      newBoards.splice(id, 1, boardName); //board state가 변경됨
      return newBoards;
    });
    setToDos((oldToDos: any) => {
      console.log('이름이 바뀌었어!');
      const copied = { ...oldToDos };
      delete copied[board];
      const oldToDo = [...oldToDos[board]];
      return {
        ...copied,
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
    setToDos((oldToDos: any) => {
      // 해당하지 "않는" 투두들만 남기고 싶은데 어렵...

      // Convert `obj` to a key/value array
      // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
      // const asArray = Object.entries(oldToDos);

      // const filtered = asArray.filter(([key, value]) => key !== board);

      // // Convert the key/value array back to an object:
      // // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
      // const justStrings = Object.fromEntries(filtered);
      // console.log(filtered);
      // console.log(justStrings);

      // return justStrings;

      const copied = { ...oldToDos };
      delete copied[board];
      return {
        ...copied
      };
    });
  };

  const handleNewToDo = ({ toDo }: any) => {
    if (!toDo) return;
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

      <form onSubmit={boardNameSubmit(handleBoardName)}>
        {/* 보드 이름 변경 */}
        <input
          {...boardNameRegister('newBoardName', {
            validate: (value) => {
              // boards 중에 지금 입력한 이름과 같은 게 있는지 판단
              if (boards.some((current) => current === boardName)) {
                // console.log('value: ', value);
                // console.log('boardName: ', boardName);
                // console.log(value === boardName);
                // if (value === boardName) {
                //   // 단, 자신의 기존 이름과 동일한 걸 쳤다면 오케이 (다른 거 쳤다가 돌아오고 싶을 때)
                //   return true;
                // }
                return '새로운 이름을 입력하세요.';
              }
            }
          })}
          type="text"
          onChange={(e) => {
            setBoardName(e.currentTarget.value);
          }}
          value={boardName}
        />
        <p style={{ color: 'red' }}>{boardNameErrors?.newBoardName?.message}</p>
        <button type="submit">Done</button>
      </form>

      <hr />

      <div>
        {/* 보드에 투두 추가 */}
        <form onSubmit={handleSubmit(handleNewToDo)}>
          <input
            {...register('toDo', { required: '입력하세용' })}
            type="text"
            placeholder="New ToDo"
          />
          <p style={{ color: 'red' }}>{errors?.toDo?.message}</p>
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
