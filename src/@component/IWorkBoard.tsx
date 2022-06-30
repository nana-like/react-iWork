import { Draggable, Droppable } from 'react-beautiful-dnd';
import IWorkCard from './IWorkCard';

const cardList = [{ text: '1' }, { text: '2' }, { text: '3' }];

const IWorkBoard = ({ title }: any) => {
  return (
    <div style={{ background: 'lightsalmon' }}>
      <strong>✋</strong>
      <p>보드 {title}</p>
      <hr />
      <Droppable droppableId={`${title}`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cardList.map((card, index) => (
              <Draggable
                draggableId={`${title}-card-${index}`}
                index={index}
                key={`${title}-card-${index}`}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <IWorkCard text={card.text} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default IWorkBoard;
