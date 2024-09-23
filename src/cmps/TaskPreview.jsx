import { Link } from 'react-router-dom'

export function TaskPreview({ task }) {
  return (
    <article className='preview'>
      <header>
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </header>

      {task.owner && (
        <p>
          Owner: <span>{task.owner.fullname}</span>
        </p>
      )}
    </article>
  )
}
