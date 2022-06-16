import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Board from './@component/Board';
import { toDoState } from './atoms';

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source, draggableId }: any) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards): any => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBaords): any => {
        const sourceBoard = [...allBaords[source.droppableId]];
        const destinationBoard = [...allBaords[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allBaords,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((board) => (
            <Board key={board} boardId={board} toDos={toDos[board]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: 5vmin auto;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;
