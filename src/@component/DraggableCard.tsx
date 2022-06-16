import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface DragabbleCardProps {
  toDo: string;
  index: number;
}

const DraggableCard = ({ toDo, index }: DragabbleCardProps) => {
  console.log(`${toDo} has been rendered.`);
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
// export default DraggableCard;

const Card = styled.li`
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardColor};

  &:hover,
  &:active {
    color: red;
  }
`;
