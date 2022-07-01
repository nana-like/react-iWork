import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IWorkBoardProps } from '../@core/recoil/atoms';
import styled from 'styled-components';
import IWorkCard from './IWorkCard';

interface IWorkBoardPropsWithIndex extends IWorkBoardProps {
  index: number;
}

const IWorkBoard = ({ title, content, index: targetIndex }: IWorkBoardPropsWithIndex) => {
  const [boardTitle, setBoardTitle] = useState(title);

  useEffect(() => {
    setBoardTitle(title);
  }, [title]);

  return (
    <Board>
      <div className="board-title">
        <span>{title}</span>
        <button className="board-delete">
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
              stroke-width="2"
            />
          </svg>
          {/* <svg
            width="512"
            height="512"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M161 164c10.988 13.43 131.245 132.262 190 190"
              stroke="#000"
              stroke-width="40"
              stroke-linecap="round"
            />
            <path
              d="M161 354.763c13.43-10.988 132.262-131.245 190-190"
              stroke="#000"
              stroke-width="40"
              stroke-linecap="round"
            />
            <circle cx="256" cy="256" r="236" stroke="#000" stroke-width="40" />
          </svg> */}
        </button>
      </div>
      <div></div>

      <CrateCard>
        <form>
          <input placeholder="Add a task" />
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
                      <IWorkCard text={card.text} />
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
  width: 28rem;
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
