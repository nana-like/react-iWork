import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Board from './@component/Board';
import { BoardState, toDoState } from './@core/recoil/atoms';

function App() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [boards, setBoards] = useRecoilState(BoardState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const handleBoards = ({ board }: any) => {
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
  const handleDragEnd = (info: any) => {
    setBoards((oldBoards) => {
      console.log(oldBoards);
      const copied = [...oldBoards];
      const old = copied.splice(info.source.index, 1);
      copied.splice(info.destination?.index, 0, info.draggableId);
      console.log(copied);
      return copied;
    });
  };

  return (
    <>
      <h1>iWork</h1>
      <br />
      <h2>Create a board</h2>
      <form onSubmit={handleSubmit(handleBoards)}>
        <input
          {...register('board', {
            required: '입력하세용',
            validate: (value) => !boards.some((board) => board === value) || '중복입니당'
          })}
          type="text"
          placeholder="New Board"
        />
        <p style={{ color: 'red' }}>{errors?.board?.message}</p>
        <button type="submit">+ New</button>
      </form>

      {/* DND 시작 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="boards" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div style={{ display: 'flex' }}>
                {boards.map((board, index) => (
                  // ! key={index} 사용하면 에러 발생 // 보드 이름으로 ID 지정
                  <Draggable draggableId={board} index={index} key={board}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div {...provided.dragHandleProps}>[손잡이]</div>
                        <Board id={index} board={board} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;

const Boards = styled.div`
  overflow-x: scroll;
  margin-top: 4rem;
  display: flex;
  padding: 3rem;
  background-color: #d5d5d5;
`;

const BoardsArea = styled.div`
  width: auto;
  height: fit-content;
  outline: 3px solid red;
  max-width: 400px;
`;
