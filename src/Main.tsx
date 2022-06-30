import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import IWorkBoard from './@component/IWorkBoard';
import IWorkCard from './@component/IWorkCard';

const boardList = ['To_do', 'Doing', 'Done'];

const Main = () => {
  const onDragEnd = (info: any) => {
    console.log(info);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: 30 }}>
        <Droppable droppableId="boardsArea" type="board">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
                      <IWorkBoard title={board} />
                    </div>
                  )}
                </Draggable>
              ))}

              <Draggable draggableId="id2" index={1}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div style={{ background: 'lightgreen' }}>
                      <strong>✋</strong>
                      <p>보드2</p>
                      <hr />
                      <Droppable droppableId="second">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            <Draggable draggableId="card2-1" index={0}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p
                                    style={{
                                      margin: '4px 0',
                                      padding: 5,
                                      background: '#000',
                                      color: '#fff'
                                    }}
                                  >
                                    카드1
                                  </p>
                                </div>
                              )}
                            </Draggable>
                            <Draggable draggableId="card2-2" index={1}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p
                                    style={{
                                      margin: '4px 0',
                                      padding: 5,
                                      background: '#000',
                                      color: '#fff'
                                    }}
                                  >
                                    카드2
                                  </p>
                                </div>
                              )}
                            </Draggable>{' '}
                            <Draggable draggableId="card2-3" index={2}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p
                                    style={{
                                      margin: '4px 0',
                                      padding: 5,
                                      background: '#000',
                                      color: '#fff'
                                    }}
                                  >
                                    카드3
                                  </p>
                                </div>
                              )}
                            </Draggable>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                )}
              </Draggable>
              <Draggable draggableId="id3" index={2}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div style={{ background: 'lightblue' }}>
                      <strong>✋</strong>
                      <p>보드3</p>
                      <hr />
                      <Droppable droppableId="third">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
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
 */
