import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../@core/recoil/atoms';

const ToDoCard = ({ board, id, text }: any) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [toDoText, setToDoText] = useState(text);

  const handleToDoText = () => {
    setToDos((oldToDos: any) => {
      const newToDos = [...oldToDos[board]];
      const targetId = newToDos.findIndex((newTodo) => newTodo.id === id);
      const newToDo = {
        id: Date.now(),
        text: toDoText
      };
      newToDos.splice(targetId, 1, newToDo);
      console.log(newToDos);
      return {
        ...oldToDos,
        [board]: newToDos
      };
    });
  };

  const handleToDoDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = [...oldToDos[board]];
      const targetId = newToDos.findIndex((newTodo) => newTodo.id === id);
      newToDos.splice(targetId, 1);
      console.log(oldToDos);
      return {
        ...oldToDos,
        [board]: newToDos
      };
    });
  };

  return (
    <Card>
      <strong>{text}</strong>

      <div>
        {/* 투두 변경 */}
        <input
          type="text"
          onChange={(e) => {
            setToDoText(e.currentTarget.value);
          }}
          value={toDoText}
        />
        <button type="button" onClick={handleToDoText}>
          Done
        </button>
      </div>

      {/* 투두 삭제 */}
      <button type="button" onClick={handleToDoDelete}>
        🗑
      </button>
    </Card>
  );
};

export default ToDoCard;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  background-color: #fafafa;
  padding: 1rem;
`;