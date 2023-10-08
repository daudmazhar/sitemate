import React, { useState } from 'react';
const BASE_URL = 'http://localhost:3000';


const Issue = (props) => {
const data = props.issue;
const [editIssue, setEditIssue] = useState(false);
const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const onFormSubmit = async (e) => {
    e.preventDefault();
    const {title, description} = formData;
    if (!title || !description) {
        return;
      } 

    try {
        const response = await fetch(`${BASE_URL}/issues/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
    
        if (response.ok) {
            props.updateIssue(data.id, title, description);
            setEditIssue(false);
        }
      } catch (error) {
        console.error('Error updating issue:', error);
      }

}

  return (
    <div className='container'>
        <h2>
            {data.title}
        </h2>
        <p>
            {data.description}
        </p>
        {editIssue && 
        <div>
            <h2>Edit Issue</h2>
                <form onSubmit={onFormSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <button className='button' type='submit'>Save</button>
                </form>
            </div>
        }

        <span>
            <button className='button' onClick={()=> setEditIssue(true)}>Update</button>
            <button className='buttonDelete' onClick={()=> props.deleteIssue(props.issue.id)}>Delete</button>
        </span>

    </div>
  );
};

export default Issue;