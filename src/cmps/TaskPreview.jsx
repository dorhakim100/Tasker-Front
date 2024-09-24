import { Link } from 'react-router-dom'

export function TaskPreview({ task }) {
  return (
    <article className='preview'>
      <header>
        <Link to={`/task/${task.id}`}>{task.title}</Link>
        <span>{task.dueDate}</span>
      </header>

      {task.owner && <span>{task.owner}</span>}
    </article>
  )
}
