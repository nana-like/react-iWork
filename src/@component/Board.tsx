import React, { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

interface BoardProps {
  boardId: string;
  toDos: string[];
}

const Board = ({ boardId, toDos }: BoardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <div>
        <input ref={inputRef} />
        <button onClick={onClick}>Click me</button>
      </div>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Wrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={!!snapshot.draggingFromThisWith}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard index={index} key={toDo} toDo={toDo} />
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </>
  );
};

export default Board;

const Wrapper = styled.ul<{ isDraggingOver: boolean; isDraggingFromThis: boolean }>`
  padding: 2rem 1rem;
  padding-top: 3rem;
  background-color: ${(props) =>
    props.isDraggingOver
      ? 'lightpink'
      : props.isDraggingFromThis
      ? 'lightgreen'
      : props.theme.boardColor};
  border-radius: 0.5rem;
`;
