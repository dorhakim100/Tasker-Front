import { useRecoilState, useRecoilValue } from 'recoil'

import { loggedinUser } from '../state/atom.js'

import { userService } from '../services/user/user.service.js'
import { TaskPreview } from './TaskPreview.jsx'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, ButtonGroup } from '@mui/material'

import { RxDotsHorizontal } from 'react-icons/rx'

export function TaskList({ tasks, onRemoveTask, onUpdateTask, setTasks }) {
  // console.log(tasks)
  const [user, setUser] = useRecoilState(loggedinUser)

  function shouldShowActionBtns(task) {
    // const user = userService.getLoggedinUser()

    if (!user) return false
    if (user.isAdmin) return true
    return task.owner?._id === user._id
  }

  const onDragEnd = async (result) => {
    const { source, destination } = result

    if (!destination) return // If dropped outside the list, ignore

    if (source.index !== destination.index) {
      const reorderedTasks = Array.from(tasks)
      console.log(user)
      console.log(reorderedTasks)
      const [removed] = reorderedTasks.splice(source.index, 1)
      reorderedTasks.splice(destination.index, 0, removed)
      // Update your state here to reflect the new order
      setTasks(reorderedTasks)
      const reorderedIds = reorderedTasks.map((task) => task.id)

      const { tasksIds } = user

      if (tasksIds.length === reorderedTasks.length) {
        const updatedUser = await userService.update({
          ...user,
          tasksIds: reorderedIds,
        })
        console.log(updatedUser)
        // setUser(updatedUser)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='tasksList' direction='horizontal'>
        {(provided) => (
          <div
            className='list'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='task-container'
                  >
                    <TaskPreview task={task} />
                    {shouldShowActionBtns(task) && (
                      <ButtonGroup
                        variant='contained'
                        aria-label='Basic button group'
                      >
                        <Button onClick={() => onUpdateTask(task)}>Edit</Button>
                        <Button onClick={() => onRemoveTask(task.id)}>
                          Remove
                        </Button>
                      </ButtonGroup>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
