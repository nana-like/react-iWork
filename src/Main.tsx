import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { IWorkBoardState, IWorkCardState } from './@core/recoil/atoms';
import IWorkBoard from './@component/IWorkBoard';

const boardList = ['To_do', 'Doing', 'Done'];

const Main = () => {
  // const [card, setCard] = useRecoilState(IWorkCardState);
  const [boardList, setBoardList] = useRecoilState(IWorkBoardState);
  const onDragEnd = ({ source, destination, type }: any) => {
    if (!destination) return;
    if (type === 'board') {
      setBoardList((oldBoardList) => {
        const copied = [...oldBoardList];
        const targetBoard = copied[source.index];
        copied.splice(source.index, 1);
        copied.splice(destination?.index, 0, targetBoard);
        return copied;
      });
    }
    if (type === 'card') {
      if (destination.droppableId === source.droppableId) {
        // 동일 보드인 경우
        setBoardList((oldBoardList) => {
          const copied = [...oldBoardList];
          const targetIndex = copied.findIndex(
            ({ title }) => title === source.droppableId
          );
          const targetBoardContent = [...copied[targetIndex].content];
          const targetCard = targetBoardContent[source.index];
          targetBoardContent.splice(source.index, 1);
          targetBoardContent.splice(destination?.index, 0, targetCard);
          copied[targetIndex] = {
            title: source.droppableId,
            content: [...targetBoardContent]
          };
          return [...copied];
        });
      }
      if (destination.droppableId !== source.droppableId) {
        // 다른 보드인 경우
        setBoardList((oldBoardList) => {
          const copied = [...oldBoardList];
          const sourceIndex = copied.findIndex(
            ({ title }) => title === source.droppableId
          );
          const destinationIndex = copied.findIndex(
            ({ title }) => title === destination.droppableId
          );
          const sourceBoardContent = [...copied[sourceIndex].content];
          const destinationBoardContent = [...copied[destinationIndex].content];
          const targetCard = sourceBoardContent[source.index];
          sourceBoardContent.splice(source.index, 1);
          destinationBoardContent.splice(destination?.index, 0, targetCard);
          copied[sourceIndex] = {
            title: source.droppableId,
            content: [...sourceBoardContent]
          };
          copied[destinationIndex] = {
            title: destination.droppableId,
            content: [...destinationBoardContent]
          };
          return [...copied];
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: 30 }}>
        <Droppable droppableId="boardsArea" type="board" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div style={{ display: 'flex' }}>
                {boardList.map((board, index) => (
                  <Draggable
                    draggableId={`board-${index}`}
                    index={index}
                    key={`board-${index}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <IWorkBoard title={board.title} content={board.content} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Main;

/**
 *
 * 작전타임! (앞으론 샌박에서 만들고 도입해보자..)
 * Context는 하나만 있어도 됨
 * dragglbeId는 "고유"해야 함
 *

 - 기존처럼 [보드이름], [{카드내용}] 각자 만들어서 이름으로 매칭할지
 - 아예 하나의 변수로 취급할지
  [
    {
      id: 0
      title: '보드1'
      content: [
        {
          id: 0,
          text: '카드 내용1-1'
        },
        {
          id: 1,
          text: '카드 내용1-2'
        },
      ]
    },
    {
      id: 1
      title: '보드2'
      content: [
        {
          id: 2,
          text: '카드 내용2-1'
        },
        {
          id: 3,
          text: '카드 내용2-2'
        },
      ]
    }
  ]


  이런 경우
  `content: boardFirstContent
  `boardFirstContent = [];
  이렇게 연결할 수 있을까?



 */
