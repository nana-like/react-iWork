import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ICard, IWorkBoardState } from '../@core/recoil/atoms';

interface IWorkCardProps extends ICard {
  boardIndex: number;
  cardIndex: number;
  resetEditCard?: boolean;
  setResetEditCard?: Dispatch<SetStateAction<boolean>>;
  isDragging?: boolean;
}

const IWorkCard = ({
  id,
  text,
  boardIndex,
  cardIndex,
  resetEditCard,
  setResetEditCard,
  isDragging
}: IWorkCardProps) => {
  const setBoardList = useSetRecoilState(IWorkBoardState);
  const [isEditCard, setIsEditCard] = useState(false);
  const { register, handleSubmit, setFocus, reset } = useForm();

  useEffect(() => {
    if (resetEditCard) {
      setIsEditCard(false);
      setResetEditCard?.(false);
    }
  }, [resetEditCard, setResetEditCard]);

  const onShowEdit = () => {
    setIsEditCard(true);
    reset({
      editCard: text
    });
    setTimeout(() => {
      setFocus('editCard');
    }, 0);
  };

  const onEditCard = ({ editCard }: { [x: string]: string }) => {
    setIsEditCard(false);
    setBoardList((oldBoardList) => {
      const boardList = [...oldBoardList];
      const targetBoardContent = [...oldBoardList[boardIndex].content];
      const targetCard = targetBoardContent[cardIndex];
      const newCard = {
        id: targetCard.id,
        text: editCard
      };
      targetBoardContent.splice(cardIndex, 1, newCard);
      boardList[boardIndex] = {
        title: boardList[boardIndex].title,
        content: targetBoardContent
      };
      return [...boardList];
    });
  };

  const onDeleteCard = () => {
    setBoardList((oldBoardList) => {
      const boardList = [...oldBoardList];
      const targetBoardContent = [...boardList[boardIndex].content];
      const targetId = targetBoardContent.findIndex((todo) => todo.id === id);
      targetBoardContent.splice(targetId, 1);
      boardList[boardIndex] = {
        title: boardList[boardIndex].title,
        content: [...targetBoardContent]
      };
      return [...boardList];
    });
  };

  return (
    <Card isEditCard={isEditCard} isDragging={isDragging}>
      {!isEditCard && (
        <div className="card-main">
          <p>{text}</p>
          <div className="card-buttons">
            <button
              className="card-edit-button"
              onClick={onShowEdit}
              aria-label="카드 편집"
            >
              <svg
                width="21"
                height="20"
                fill="none"
                viewBox="0 0 21 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m2.799 17.692.793-4.627a.472.472 0 0 1 .124-.245L13.81 2.175a.39.39 0 0 1 .04-.037c.23-.186 2.386-1.84 4.305-.276 1.257 1.025 1.148 2.553.266 3.975a.47.47 0 0 1-.058.076l-10.08 10.63a.531.531 0 0 1-.246.146l-4.846 1.322c-.219.06-.428-.11-.392-.32Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m3.36 15.383-.32 1.873c-.037.208.173.379.391.32l1.777-.485a4.924 4.924 0 0 0-1.848-1.708Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className="card-delete-button"
              onClick={onDeleteCard}
              aria-label="카드 삭제"
            >
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
                  strokeWidth="1.4"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {isEditCard && (
        <div className="card-edit">
          <form onSubmit={handleSubmit(onEditCard)}>
            <input
              {...register('editCard')}
              type="text"
              placeholder="Type here..."
              defaultValue={text}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  reset({
                    editCard: text
                  });
                  setIsEditCard(false);
                }
              }}
            />
          </form>
          <button
            className="card-edit-cancle"
            type="button"
            aria-label="카드 편집 취소"
            onClick={() => {
              reset({
                editCard: text
              });
              setIsEditCard(false);
            }}
          >
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
      )}
    </Card>
  );
};

export default IWorkCard;

const Card = styled.div<{
  isEditCard: boolean;
  isDragging: boolean | undefined;
}>`
  opacity: ${(prop) => (prop.isDragging ? 0.7 : 1)};
  padding: 1.4rem 1.4rem;
  color: ${(prop) => (prop.isEditCard ? '#111' : ' #fff')};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  background-color: ${(prop) => (prop.isEditCard ? '#fff' : '#111')};
  border: 2px solid #111;
  border-radius: 3px;
  /* outline: ${(prop) => (prop.isDragging ? '3px solid #fff458' : 'null')}; */

  &:hover {
    .card-main .card-buttons {
      opacity: 1;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 0;
  }

  .card-main {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 0.8rem;
    }

    .card-buttons {
      opacity: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: opacity 0.2s;

      button {
        opacity: 0.5;
        width: 1.4rem;
        height: 1.4rem;
        color: #fff;
        transition: opacity 0.2s;

        svg {
          flex-shrink: 0;
        }

        &:hover {
          opacity: 1;
        }
      }

      .card-edit-button svg {
        width: 1.6rem;
      }
    }
  }

  .card-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0;

    form {
      width: 100%;
    }

    input {
      width: 100%;
      padding: 0;
      flex-shrink: 0;
      font-size: 1.6rem;
      font-weight: 500;
      color: ${(prop) => (prop.isEditCard ? '#111' : ' #fff')};
      background-color: transparent;
    }

    .card-edit-cancle {
      width: 1.8rem;
      height: 1.8rem;
      padding: 0;
      color: #111;
      margin-left: 0.8rem;
      border-radius: 50%;
      outline: 0.15rem solid #111;
      flex-shrink: 0;
      padding: 0.2rem;

      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
`;
