import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IconButton, Panel, toaster, Notification, Modal, Form, Input, Button, TagPicker } from 'rsuite';
import styled from 'styled-components';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';

const Card = ({ tags }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const fetch = async () => {
    try {
      const result = await axios.get('https://todoserver-uen5.onrender.com/');
      setTodos(result.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const ExtractTagColor = (tag) => {
    const color = tags.find(t => t.label === tag);
    return color ? color.color : "#ffffff";
  };

  useEffect(() => {
    fetch();
  }, [todos]);

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`https://todoserver-uen5.onrender.com/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      toaster.push(<Notification type="success" header="Successful Operation">
        {result.data.message}
      </Notification>, { placement: "topCenter", duration: 3000 });
    } catch (error) {
      toaster.push(<Notification type="error" header="Error" closable>
        {error.response?.data?.message || 'There was an error deleting the todo.'}
      </Notification>, { placement: 'topCenter', duration: 3000 });
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setSelectedTags(todo.tags.split(','));
  };

  const handleModalClose = () => {
    setEditingTodo(null);
    fetch();
  };

  const handleSave = async () => {
    try {
      const updatedTodo = { ...editingTodo, tags: selectedTags.join(',') };
      const response = await axios.put(`https://todoserver-uen5.onrender.com/${editingTodo.id}`, updatedTodo);
      toaster.push(<Notification type="success" header="Successful Operation">
        {response.data.message}
      </Notification>, { placement: "topCenter", duration: 3000 });
      handleModalClose();
    } catch (error) {
      toaster.push(<Notification type="error" header="Error" closable>
        {error.response?.data?.message || 'There was an error updating the todo.'}
      </Notification>, { placement: 'topCenter', duration: 3000 });
    }
  };

  const handleTagChange = (value) => {
    if (value.length <= 1) {
        setSelectedTags(value);
      }
  };

  return (
    <Blocks>
      {todos.length === 0 ? (<Avaibility><h1>Todos are not available</h1></Avaibility>) : (
        todos.map((result, key) => {
          return (
            <Panel className='cards' key={key} shaded bordered bodyFill style={{ display: 'inline-block', width: 240, backgroundColor: ExtractTagColor(result.tags) }}>
              <Panel header={result.title}>
                <p>
                  <small>
                    {result.description}
                  </small>
                </p>
              </Panel>
              <BTN>
                <IconButton
                  appearance="subtle"
                  icon={<TrashIcon />}
                  onClick={() => handleDelete(result.id)}
                />
                <IconButton
                  appearance="subtle"
                  icon={<EditIcon />}
                  onClick={() => handleEdit(result)}
                />
              </BTN>
            </Panel>
          )
        })
      )}

      {editingTodo && (
        <Modal open={true} onClose={handleModalClose}>
          <Modal.Header>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form fluid>
              <Form.Group controlId="Title">
                <Form.ControlLabel>Title</Form.ControlLabel>
                <Form.Control name="title" value={editingTodo.title} onChange={(value) => setEditingTodo({ ...editingTodo, title: value })} />
              </Form.Group>
              <Form.Group controlId="Description">
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Input as="textarea" rows={5} name="description" value={editingTodo.description} onChange={(value) => setEditingTodo({ ...editingTodo, description: value })} />
              </Form.Group>
              <Form.Group controlId="Tags">
                <Form.ControlLabel>Tags</Form.ControlLabel>
                <TagPicker 
                  data={tags.map(tag => ({ label: tag.label, value: tag.label, color: tag.color }))}
                  value={selectedTags}
                  onChange={handleTagChange}
                  block
                  renderMenuItem={(label, item) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        backgroundColor: item.color,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        marginRight: 10
                      }}></div>
                      {label}
                    </div>
                  )}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSave} appearance="primary">Save</Button>
            <Button onClick={handleModalClose} appearance="subtle">Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Blocks>
  );
};

export default Card;

const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: inherit;
  flex-wrap: wrap;
  gap: 10px;
  .cards{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    cursor: pointer;
    transition: 0ms.3s ease-in-out all;
    &:hover{
      // Add hover effects if needed
    }
  }
`;
const BTN = styled.div`
  display: flex;
  flex-direction: row-reverse;
  button{
    margin-right: 10px;
  }
`;

const Avaibility = styled.div`
  color: grey;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
