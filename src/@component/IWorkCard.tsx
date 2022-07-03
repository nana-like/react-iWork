import { createRef, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IWorkBoardState } from '../@core/recoil/atoms';

const IWorkCard = ({
  id,
  text,
  boardIndex,
  cardIndex,
  newCardAdded,
  setNewCardAdded
}: any) => {
  const [boardList, setBoardList] = useRecoilState(IWorkBoardState);
  const [currentCardText, setCurrentCardText] = useState(text);
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors }
  } = useForm();

  // const setFocus = () => {
  //   ref.current && ref.current.focus();
  // };

  useEffect(() => {
    console.log('newCardAdded', newCardAdded);
    if (newCardAdded) {
      setIsEditMode(false);
      setNewCardAdded(false);
    }
  }, [newCardAdded]);

  const onEditCard = ({ editCard }: any) => {
    setIsEditMode(false);
    setBoardList((oldBoardList) => {
      const copied = [...oldBoardList];
      const targetBoardContent = [...oldBoardList[boardIndex].content];
      const targetCard = targetBoardContent[cardIndex];
      const newCard = {
        id: targetCard.id,
        text: editCard
      };
      targetBoardContent.splice(cardIndex, 1, newCard);
      copied[boardIndex] = {
        title: copied[boardIndex].title,
        content: targetBoardContent
      };
      // const targetBoardContent = [...copied[boardIndex].content];
      // const targetId = targetBoardContent.findIndex((todo) => todo.id === id);
      // targetBoardContent.splice(targetId, 1);
      // copied[boardIndex] = {
      //   title: copied[boardIndex].title,
      //   content: [...targetBoardContent]
      // };
      return [...copied];
    });
  };

  const onShowEdit = () => {
    setIsEditMode(true);
    // setFocus('editCard');
    reset({
      editCard: text
    });

    setTimeout(() => {
      setFocus('editCard');
    }, 0);
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
    console.log(isEditMode);
  };

  const onBlurEdit = () => {
    console.log('ONBLUR');
  };

  const onDeleteCard = () => {
    setBoardList((oldBoardList) => {
      const copied = [...oldBoardList];
      const targetBoardContent = [...copied[boardIndex].content];
      const targetId = targetBoardContent.findIndex((todo) => todo.id === id);
      targetBoardContent.splice(targetId, 1);
      copied[boardIndex] = {
        title: copied[boardIndex].title,
        content: [...targetBoardContent]
      };
      return [...copied];
    });
  };

  return (
    <Card isEditMode={isEditMode}>
      {!isEditMode && (
        <div className="card-main">
          <p>{text}</p>
          <div className="card-buttons">
            <button className="card-edit-button" onClick={onShowEdit}>
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
            <button className="card-delete-button" onClick={onDeleteCard}>
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
      {isEditMode && (
        <div className="card-edit">
          <form onSubmit={handleSubmit(onEditCard)}>
            <input
              {...register('editCard')}
              type="text"
              placeholder="Type here..."
              defaultValue={text}
              // onChange={(e) => {
              //   setCurrentCardText(e.currentTarget.value);
              // }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  reset({
                    editCard: text
                  });
                  setIsEditMode(false);
                }
              }}
            />
          </form>
          <button
            className="card-edit-cancle"
            type="button"
            onClick={() => {
              reset({
                editCard: text
              });
              setIsEditMode(false);
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

const Card = styled.div<{ isEditMode: boolean }>`
  /* overflow: hidden; */
  margin-top: 0.8rem;
  /* padding: ${(prop) => (prop.isEditMode ? '1.1rem 1rem' : '1.4rem')}; */
  padding: 1.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 3px;

  color: #fff;
  background-color: #111;
  background-color: ${(prop) => (prop.isEditMode ? '#fff' : '#111')};
  line-height: 2.4rem;
  box-sizing: border-box;
  border: 2px solid #111;
  color: ${(prop) => (prop.isEditMode ? '#111' : ' #fff')};

  &:hover {
    .card-buttons {
      opacity: 1;
    }
  }

  .card-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 0.2rem 0; */
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 0.8rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 0;
  }

  .card-buttons {
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    button {
      opacity: 0.5;

      width: 1.8rem;
      height: 1.8rem;
      color: #fff;

      svg {
        flex-shrink: 0;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  .card-edit-button {
    svg {
      width: 1.7rem;
    }
  }

  .card-edit {
    /* display: none; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 0 0.2rem; */

    form {
      width: 100%;
    }

    input {
      width: 100%;
      flex-shrink: 0;
      font-size: 1.6rem;
      font-weight: 500;
      padding: 0;
      /* border: 4px solid #fff; */
      /* border-bottom-width: 2px; */

      color: #fff;
      color: ${(prop) => (prop.isEditMode ? '#111' : ' #fff')};
      background-color: transparent;
      /* border-bottom: 1px solid #fff; */
      /* background-color: #fff; */
      /* background-color: rgba(196, 196, 196, 0.5); */
    }
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
`;
