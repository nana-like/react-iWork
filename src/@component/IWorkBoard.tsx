import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { IWorkBoardProps, IWorkBoardState } from '../@core/recoil/atoms';
import styled from 'styled-components';
import IWorkCard from './IWorkCard';
import { useRecoilState } from 'recoil';
import classNames from 'classnames/bind';
import styles from './IWorkBoard.module.scss';

const cx = classNames.bind(styles);

interface IWorkBoardPropsWithIndex extends IWorkBoardProps {
  index: number;
}

const IWorkBoard = ({ title, content, index: targetIndex }: IWorkBoardPropsWithIndex) => {
  const [boardTitle, setBoardTitle] = useState(title);

  useEffect(() => {
    setBoardTitle(title);
  }, [title]);

  return (
    <div className={cx('board')}>
      <div className={cx('board-title')}>{title}</div>

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
    </div>
  );
};

export default IWorkBoard;

const CrateCard = styled.div`
  overflow: hidden;
  margin: 0 2.6rem 2rem;
  border-bottom: 3px solid #111;

  input {
    padding: 0.4rem 0.2rem 0.6rem 0.2rem;
    font-size: 1.8rem;
    font-weight: 500;

    &::placeholder {
      color: #999;
    }
  }
`;

const CardsArea = styled.div`
  padding: 0 2.6rem 2.6rem;
`;
