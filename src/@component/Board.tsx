import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BoardState } from '../@core/recoil/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Board = ({ id, board }: any) => {
  const { register, handleSubmit } = useForm();
  const [boards, setBoards] = useRecoilState(BoardState);
  const handleBoardTitle = (data: any) => {
    console.log(data);
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards];
      newBoards.splice(id, 1, data.newBoardName);
      return newBoards;
    });
  };
  const handleBoardDelete = () => {
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards];
      newBoards.splice(id, 1);
      return newBoards;
    });
  };

  const [boardName, setBoardName] = useState(board);
  useEffect(() => {
    setBoardName(board);
  }, [board]);

  const handleBoardName = () => {
    setBoards((oldBoards) => {
      const newBoards = [...oldBoards];
      newBoards.splice(id, 1, boardName); //board state가 변경됨
      return newBoards;
    });
  };

  return (
    <Wrapper>
      <BoardTitle>
        board: {board} | id: {id}
      </BoardTitle>

      <div>
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

      <button type="button" onClick={handleBoardDelete}>
        ❌
      </button>
      <hr />
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
