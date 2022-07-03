import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { IWorkBoardState } from './@core/recoil/atoms';
import IWorkBoard from './@component/IWorkBoard';
import styled from 'styled-components';
import CreateBoard from './@component/CreateBoard';
import { useState } from 'react';

const Main = () => {
  const [boardList, setBoardList] = useRecoilState(IWorkBoardState);
  const [resetEditCard, setResetEditCard] = useState(false); //편집 중인 카드가 있다면 리셋할지

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
    setResetEditCard(true);
  };
  console.log(boardList);

  const [newCardAdded, setNewCardAdded] = useState(false);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: '3rem' }}>
        <MainTitle>
          <span>iWORK</span>
          <div className="deco" aria-hidden="true">
            <span>iWORK</span>
            <span>iWORK</span>
            <span>iWORK</span>
            <span>iWORK</span>
            <span>iWORK</span>
            <span>iWORK</span>
            <span>iWORK</span>
            <span>iWORK</span>
          </div>
        </MainTitle>
        <CreateBoard />
        <BoardsWrapper>
          <Droppable
            droppableId="boardsArea"
            type="board"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <BoardsArea>
                  {boardList.map((board, index) => (
                    <main>
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
                            <IWorkBoard
                              title={board.title}
                              content={board.content}
                              index={index}
                              resetEditCard={resetEditCard}
                              setResetEditCard={setResetEditCard}
                              newCardAdded={newCardAdded}
                              setNewCardAdded={setNewCardAdded}
                            />
                          </div>
                        )}
                      </Draggable>
                    </main>
                  ))}
                  {provided.placeholder}
                </BoardsArea>
              </div>
            )}
          </Droppable>
        </BoardsWrapper>
      </div>
    </DragDropContext>
  );
};

export default Main;

const MainTitle = styled.h1`
  width: 100%;
  overflow: hidden;
  display: flex;
  padding: 1.6rem 1rem;
  font-size: 4.6rem;
  font-weight: 700;
  border-top: 1px solid #111;
  border-bottom: 1px solid #111;
  letter-spacing: 0.05rem;

  .deco {
    overflow: hidden;
    user-select: none;

    span:nth-child(2n - 1) {
      color: transparent;
      -webkit-text-stroke: 2px #111;
    }
  }
`;

const BoardsWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 3rem;
`;

const BoardsArea = styled.div`
  display: flex;
  main {
    height: fit-content;
  }
`;

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
