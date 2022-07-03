import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { IWorkBoardState } from './@core/recoil/atoms';
import IWorkBoard from './@component/IWorkBoard';
import styled from 'styled-components';
import IWorkCreateBoard from './@component/IWorkCreateBoard';
import { useState } from 'react';
import IWorkTrashBin from './@component/IWorkTrashBin';

interface IDnd {
  source: DraggableLocation;
  destination?: DraggableLocation;
  type?: string;
}

const Main = () => {
  const [boardList, setBoardList] = useRecoilState(IWorkBoardState);
  const [resetEditCard, setResetEditCard] = useState(false); //편집 중인 카드가 있다면 리셋할지
  const [trashBinShow, setTrashBinShow] = useState(false);

  const onDragStart = ({ type }: { type: string }) => {
    if (type === 'card') {
      setTrashBinShow(true);
    }
  };
  const onDragEnd = ({ source, destination, type }: IDnd) => {
    setTrashBinShow(false);
    if (!destination) return;
    if (type === 'board') {
      setBoardList((oldBoardList) => {
        const boardList = [...oldBoardList];
        const targetBoard = boardList[source.index];
        boardList.splice(source.index, 1);
        boardList.splice(destination?.index, 0, targetBoard);
        return boardList;
      });
    }
    if (type === 'card') {
      if (destination.droppableId === 'trashbin') {
        // 쓰레기통으로 옮긴 경우
        setBoardList((oldBoardList) => {
          const boardList = [...oldBoardList];
          const targetIndex = boardList.findIndex(
            ({ title }) => title === source.droppableId
          );
          const targetBoardContent = [...boardList[targetIndex].content];
          targetBoardContent.splice(source.index, 1);
          boardList[targetIndex] = {
            title: source.droppableId,
            content: [...targetBoardContent]
          };
          return [...boardList];
        });
      } else if (destination.droppableId === source.droppableId) {
        setBoardList((oldBoardList) => {
          const boardList = [...oldBoardList];
          const targetIndex = boardList.findIndex(
            ({ title }) => title === source.droppableId
          );
          const targetBoardContent = [...boardList[targetIndex].content];
          const targetCard = targetBoardContent[source.index];
          targetBoardContent.splice(source.index, 1);
          targetBoardContent.splice(destination?.index, 0, targetCard);
          boardList[targetIndex] = {
            title: source.droppableId,
            content: [...targetBoardContent]
          };
          return [...boardList];
        });
      } else if (destination.droppableId !== source.droppableId) {
        setBoardList((oldBoardList) => {
          const boardList = [...oldBoardList];
          const sourceIndex = boardList.findIndex(
            ({ title }) => title === source.droppableId
          );
          const destinationIndex = boardList.findIndex(
            ({ title }) => title === destination.droppableId
          );
          const sourceBoardContent = [...boardList[sourceIndex].content];
          const destinationBoardContent = [
            ...boardList[destinationIndex].content
          ];
          const targetCard = sourceBoardContent[source.index];
          sourceBoardContent.splice(source.index, 1);
          destinationBoardContent.splice(destination?.index, 0, targetCard);
          boardList[sourceIndex] = {
            title: source.droppableId,
            content: [...sourceBoardContent]
          };
          boardList[destinationIndex] = {
            title: destination.droppableId,
            content: [...destinationBoardContent]
          };
          return [...boardList];
        });
      }
    }
    setResetEditCard(true);
  };
  return (
    <MainWrapper>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
        <IWorkCreateBoard />
        <Droppable droppableId="boardsArea" type="board" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="boards-wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {boardList.map((board, index) => (
                <Draggable
                  draggableId={`board-${index}`}
                  index={index}
                  key={`board-${index}`}
                >
                  {(provided) => (
                    <div
                      className="board-wrap"
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
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <IWorkTrashBin trashBinShow={trashBinShow} />
      </DragDropContext>
      <p className="copy">
        <a href="https://nykim.work" target="_blank" rel="noreferrer">
          Nana
        </a>
        &nbsp;with&nbsp;
        <a href="https://nomadcoders.co/" target="_blank" rel="noreferrer">
          Nomad Coders
        </a>
      </p>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  padding: 3rem;

  .copy {
    width: 100%;
    margin-top: 8rem;
    text-align: center;
    color: #aaa;
    font-size: 1.3rem;

    a {
      color: inherit;

      &:hover {
        color: #111;
      }
    }
  }

  .boards-wrapper {
    display: flex;
    overflow-x: auto;
    padding-bottom: 3rem;
  }
  .board-wrap {
    height: fit-content;
  }
`;

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
