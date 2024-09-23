import { userService } from '../services/user/user.service.js'
import { TaskPreview } from './TaskPreview.jsx'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { RxDotsHorizontal } from 'react-icons/rx'

export function TaskList({ tasks, onRemoveTask, onUpdateTask, setTasks }) {
  // console.log(tasks)
  function shouldShowActionBtns(task) {
    const user = userService.getLoggedinUser()

    if (!user) return false
    if (user.isAdmin) return true
    return task.owner?._id === user._id
  }

  const onDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) return // If dropped outside the list, ignore

    if (source.index !== destination.index) {
      const reorderedTasks = Array.from(tasks)
      const [removed] = reorderedTasks.splice(source.index, 1)
      reorderedTasks.splice(destination.index, 0, removed)
      console.log(reorderedTasks)
      // Update your state here to reflect the new order
      setTasks(reorderedTasks)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='tasksList'>
        {(provided) => (
          <ul
            className='list'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskPreview task={task} />
                    {shouldShowActionBtns(task) && (
                      <div className='actions'>
                        <button onClick={() => onUpdateTask(task)}>Edit</button>
                        <button onClick={() => onRemoveTask(task.id)}>x</button>
                      </div>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
