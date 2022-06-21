import React from 'react';
import { IToDo } from '../@core/recoil/atoms';

const ToDoCard = ({ id, text }: IToDo) => {
  return <div>{text}</div>;
};

export default ToDoCard;
