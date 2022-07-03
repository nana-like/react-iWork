import { Dispatch, SetStateAction } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IBoard, IWorkBoardState } from '../@core/recoil/atoms';
import styled from 'styled-components';
import IWorkCard from './IWorkCard';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

interface IWorkBoardProps extends IBoard {
  index: number;
  resetEditCard?: boolean;
  setResetEditCard?: Dispatch<SetStateAction<boolean>>;
}

const IWorkBoard = ({
  title,
  content,
  index: boardIndex,
  resetEditCard,
  setResetEditCard
}: IWorkBoardProps) => {
  const setBoardList = useSetRecoilState(IWorkBoardState);
  const { register, setValue, handleSubmit } = useForm();
  const onCreateCard = ({ createCard }: { [x: string]: string }) => {
    if (!createCard) return;
    setValue('createCard', '');
    setResetEditCard?.(true);
    setBoardList((oldBoardList) => {
      const boardList = [...oldBoardList];
      const targetBoardContent = [...oldBoardList[boardIndex].content];
      const newCard = {
        id: Date.now(),
        text: createCard
      };
      targetBoardContent.splice(0, 0, newCard);
      boardList[boardIndex] = {
        title: boardList[boardIndex].title,
        content: targetBoardContent
      };
      return [...boardList];
    });
  };
  const onDeleteBoard = () => {
    setBoardList((oldBoardList) => {
      const boardList = [...oldBoardList];
      boardList.splice(boardIndex, 1);
      return boardList;
    });
  };

  return (
    <Board>
      <div className="board-title">
        <span>{title}</span>
        <button className="board-delete" onClick={onDeleteBoard}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 4.5L15.5 15.5M15.5 4.5L4.5 15.5"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
      <div className="board-create">
        <form onSubmit={handleSubmit(onCreateCard)}>
          <input
            {...register('createCard')}
            type="text"
            placeholder="Add a task"
          />
        </form>
      </div>
      <Droppable droppableId={`${title}`} type="card">
        {(provided, snapshot) => (
          <div
            className="board-droppable"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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
                    <IWorkCard
                      id={card.id}
                      text={card.text}
                      boardIndex={boardIndex}
                      cardIndex={index}
                      resetEditCard={resetEditCard}
                      setResetEditCard={setResetEditCard}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Board>
  );
};

export default IWorkBoard;

const Board = styled.div`
  overflow: hidden;
  width: 30rem;
  height: auto;
  margin-right: 2rem;
  background-color: #fff;
  border: 0.4rem solid #111;
  border-radius: 1rem;

  .board-title {
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 2rem 2.6rem 2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 2.8rem;
    font-size: 2.2rem;
    font-weight: bold;
    background-color: #fff458;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover .board-delete {
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }

  .board-delete {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.6rem;
    padding: 0.2rem;
    border-radius: 50%;
    background: none;
    opacity: 0;
    color: #111;
    transition: opacity 0.2s;
    border: 0;

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  .board-create {
    overflow: hidden;
    margin: 0 2.6rem 2rem;
    border-bottom: 3px solid #111;

    input {
      width: 100%;
      padding: 0.4rem 0.2rem 0.6rem 0.2rem;
      font-size: 1.8rem;
      font-weight: 500;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &::placeholder {
        color: #999;
      }
    }
  }

  .board-droppable {
    padding: 0 2.6rem 2.6rem;
  }

  [data-rbd-droppable-id] {
    min-height: 0.1rem;
  }

  [data-rbd-draggable-id] {
    margin-top: 1rem;
  }
`;
