import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one">
        {() => (
          <ul>
            <Draggable draggableId="first" index={0}>
              {() => <li>First</li>}
            </Draggable>
            <Draggable draggableId="second" index={1}>
              {() => <li>Second</li>}
            </Draggable>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
