import React from 'react';
import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

interface BoardProps {
  boardId: string;
  toDos: IToDo[];
}

interface FormProps {
  toDo: string;
}

const Board = ({ boardId, toDos }: BoardProps) => {
  const { register, setValue, handleSubmit } = useForm<FormProps>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: FormProps) => {
    const newToDo = {
      id: Date.now(),
      text: toDo
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo]
      };
    });
    setValue('toDo', '');
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={!!snapshot.draggingFromThisWith}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard index={index} key={toDo.id} id={toDo.id} text={toDo.text} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  outline: 3px solid red;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  text-transform: uppercase;
  margin: 0 0 2rem;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

const Area = styled.ul<{ isDraggingOver: boolean; isDraggingFromThis: boolean }>`
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
