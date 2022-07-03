import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IWorkBoardProps, IWorkBoardState } from '../@core/recoil/atoms';
import styled from 'styled-components';
import IWorkCard from './IWorkCard';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

interface IWorkBoardPropsWithIndex extends IWorkBoardProps {
  index: number;
  newCardAdded: boolean;
  setNewCardAdded: any;
  resetEditCard: any;
  setResetEditCard: any;
}

const IWorkBoard = ({
  title,
  content,
  index: targetIndex,
  newCardAdded,
  resetEditCard,
  setResetEditCard,
  setNewCardAdded
}: IWorkBoardPropsWithIndex) => {
  const [boardTitle, setBoardTitle] = useState(title);
  const [boardList, setBoardList] = useRecoilState(IWorkBoardState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const createCard = ({ createCard }: any) => {
    if (!createCard) return;
    setValue('createCard', '');
    setNewCardAdded(true);
    setBoardList((oldBoardList) => {
      const copied = [...oldBoardList];
      const targetBoardContent = [...oldBoardList[targetIndex].content];
      const newCard = {
        id: Date.now(),
        text: createCard
      };
      targetBoardContent.splice(0, 0, newCard);
      copied[targetIndex] = {
        title: copied[targetIndex].title,
        content: targetBoardContent
      };
      return [...copied];
    });
  };

  const onDeleteBoard = () => {
    setBoardList((oldBoardList) => {
      const copied = [...oldBoardList];
      copied.splice(targetIndex, 1);
      return copied;
    });
  };

  useEffect(() => {
    setBoardTitle(title);
  }, [title]);

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
      <div></div>

      <CrateCard>
        <form onSubmit={handleSubmit(createCard)}>
          <input
            {...register('createCard')}
            type="text"
            placeholder="Add a task"
          />
        </form>
      </CrateCard>

      <CardsArea>
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
                      <IWorkCard
                        id={card.id}
                        text={card.text}
                        boardIndex={targetIndex}
                        cardIndex={index}
                        newCardAdded={newCardAdded}
                        setNewCardAdded={setNewCardAdded}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardsArea>
    </Board>
  );
};

export default IWorkBoard;

const Board = styled.div`
  width: 30rem;
  height: fit-content;
  // padding: 2.8rem;
  border: 0.4rem solid #111;
  border-radius: 1rem;
  margin-right: 2rem;
  background-color: #fff;
  overflow: hidden;

  .board-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 2rem;
    line-height: 2.8rem;
    font-size: 2.2rem;
    font-weight: 700;

    padding: 2rem 2.6rem 2rem;
    // background-color: #ededed;
    background-color: #ffed00;
    background-color: #fff458;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover .board-delete {
      visibility: visible;
      opacity: 0.5;
      transition: all 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }

  .board-delete {
    margin-left: 0.6rem;
    visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 0.2rem;
    border-radius: 50%;
    background: none;
    opacity: 0;
    color: #111;
    transition: all 0.2s;
    /* transition: visibility 0.1s opacity 0.2s; */

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

const CrateCard = styled.div`
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
`;

const CardsArea = styled.div`
  padding: 0 2.6rem 2.6rem;
`;
