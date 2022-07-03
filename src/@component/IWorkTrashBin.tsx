import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const IWorkTrashBin = ({ trashBinShow }: { trashBinShow?: boolean }) => {
  return (
    <TrashBin trashBinShow={trashBinShow}>
      <Droppable droppableId="trashbin" type="card">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className="trashbin-area"
            {...provided.droppableProps}
          >
            <TrashIcon isDraggingOver={snapshot.isDraggingOver}>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h20v20H0z" />
                <path
                  d="M4.302 6.36h11.396c.53 0 .954.445.926.975l-.54 10.526a.928.928 0 0 1-.926.88H4.842a.928.928 0 0 1-.927-.88l-.54-10.526a.928.928 0 0 1 .927-.975Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="m7.134 9.258.3 6.554M12.834 9.258l-.3 6.554M9.968 9.258v6.554"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 2.95v1.6c0 .11.09.2.2.2h13.6a.2.2 0 0 0 .2-.2v-1.6a.2.2 0 0 0-.2-.2h-3.9a.1.1 0 0 1-.1-.1v-1.2a.2.2 0 0 0-.2-.2H7.4a.2.2 0 0 0-.2.2v1.2a.1.1 0 0 1-.1.1H3.2a.2.2 0 0 0-.2.2Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </TrashIcon>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </TrashBin>
  );
};

export default IWorkTrashBin;

const TrashIcon = styled.div<{ isDraggingOver?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 2px solid #111;
  border-color: ${(prop) => (prop.isDraggingOver ? '#ff3030' : '#111')};
  color: ${(prop) => (prop.isDraggingOver ? '#ff3030' : '#111')};
  border-radius: 50%;

  svg {
    width: 3rem;
  }
`;

const TrashBin = styled.div<{ trashBinShow?: boolean }>`
  .trashbin-area {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    width: 6rem;
    height: 6rem;
    opacity: ${(prop) => (prop.trashBinShow ? 1 : 0)};
    visibility: ${(prop) => (prop.trashBinShow ? 'visible' : 'hidden')};
    transition: all 0.15s;

    @media (max-height: 400px) {
      display: none;
    }
  }
`;
