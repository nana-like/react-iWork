import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { IWorkBoardProps, IWorkBoardState } from '../@core/recoil/atoms';
import IWorkCard from './IWorkCard';

const cardList = [{ text: '1' }, { text: '2' }, { text: '3' }];

const IWorkBoard = ({ title, content }: IWorkBoardProps) => {
  const [boardList, setBoardList] = useRecoilState(IWorkBoardState);
  // console.log(content);
  return (
    <div style={{ background: 'lightsalmon' }}>
      <strong>✋</strong>
      <p>{title}</p>
      <hr />
      <Droppable droppableId={`${title}`} type="card">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {content.map((card, index) => (
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
