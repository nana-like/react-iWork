import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface DragabbleCardProps {
  id: number;
  text: string;
  index: number;
}

const DraggableCard = ({ id, text, index }: DragabbleCardProps) => {
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);

const Card = styled.li<{ isDragging: boolean }>`
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: ${(props) => (props.isDragging ? '#999' : props.theme.cardColor)};
  color: ${(props) => (props.isDragging ? '#fff' : '#222')};
`;
