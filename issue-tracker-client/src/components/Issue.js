import React from 'react';

const Issue = (issue, deleteIssue) => {
const data = issue.issue;
  return (
    <div className='container'>
        <h3>
            {data.title}
        </h3>
        <p>
            {data.description} <span> <button className='button' onClick={deleteIssue}>Delete</button></span>
        </p>

    </div>
  );
};

export default Issue;