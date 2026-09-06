import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TaskDetail({ tasks, addComment }) {
  const params = useParams();
  const task = tasks.find(item => item.id === Number(params.id));
  const [commentText, setCommentText] = useState('');

  function handleAddComment() {
    if (commentText.trim() === '') return;
    addComment(task.id, commentText);
    setCommentText('');
  }

  return (
    <div className="app">
        <Link className="back-link" to="/">← Back to tasks</Link>
      {task && (
        <>
          <h2>{task.description}</h2>

          <h3>Comments</h3>
          <div className="add-task">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add</button>
          </div>

          <ul className="task-list">
            {(task.comments || []).map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </>
      )}
      {!task && <p>The task was not found</p>}
    </div>
  );
}

export default TaskDetail;