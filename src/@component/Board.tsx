import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

interface BoardProps {
  boardId: string;
  toDos: string[];
}

const Board = ({ boardId, toDos }: BoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard index={index} key={toDo} toDo={toDo} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Board;

const Wrapper = styled.ul`
  padding: 2rem 1rem;
  padding-top: 3rem;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 0.5rem;
`;
