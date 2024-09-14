import React, { useState } from "react";
import { Button, ButtonToolbar, IconButton, Modal, Form, Input, TagPicker, toaster,Notification } from "rsuite";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import axios from 'axios';
import TrashIcon from '@rsuite/icons/Trash';

const Model = ({ tags }) => {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const handleOpen = () =>{ 
    setFormError("")
    setOpen(true)
};
  const handleClose = () => {
    setTitle("")
    setDescription("")
    setSelectedTags([])
    setOpen(false)
};

  const handleCreate = async() => {
    if (title.trim() === "" || description.trim() === "" || selectedTags.length === 0) {
        setFormError("All fields are required.");
      } else {
        try {
          const response = await axios.post('https://todoserver-uen5.onrender.com/', {
            title: title,
            description: description,
            tags: selectedTags.join(", ")
          });
          toaster.push(<Notification type="success" header="Success" closable>
            {response.data.message}
          </Notification>, { placement: 'topCenter', duration: 3000 });
          setFormError("");
          handleClose();
        }catch (error) {
          toaster.push(<Notification type="error" header="Error" closable>
            {error.response?.data?.message || 'There was an error creating the todo.'}
            </Notification>, { placement: 'topCenter', duration: 3000 });
        } 
      }
  };

  const handleDelete = async ()=>{
    try{
      const response = await axios.delete("https://todoserver-uen5.onrender.com/");
      toaster.push(<Notification type="success" header="Success" closable>
        {response.data.message}
      </Notification>)
    }catch(error){
      toaster.push(<Notification type="error" header="Error" closable>
        {error.response?.data?.message || 'There was an error creating the todo.'}
        </Notification>, { placement: 'topCenter', duration: 3000 });
    }
  }
  const handleTagChange = (value) => {
    if (value.length <= 1) {
      setSelectedTags(value);
    }
  };

  return (
    <div>
      <div className="buttonGroup" style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
      <ButtonToolbar>
        <IconButton
          appearance="primary"
          color="green"
          onClick={handleOpen}
          icon={<AddOutlineIcon />}
        >
          Create
        </IconButton>
      </ButtonToolbar>
      <ButtonToolbar style={{marginLeft:"10px"}}>
        <IconButton
          appearance="primary"
          color="red"
          onClick={handleDelete}
          icon={<TrashIcon />}
        >
          Delete All
        </IconButton>
      </ButtonToolbar>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Create New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group controlId="Title">
              <Form.ControlLabel>Title</Form.ControlLabel>
              <Form.Control name="Title"  value={title} 
                onChange={(value) => setTitle(value)}/>
              <Form.HelpText>Title is Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="textarea-1">
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Input as="textarea" rows={5} name="textarea" placeholder="Enter Description" value={description} 
                onChange={(value) => setDescription(value)} />
            </Form.Group>
            <Form.Group controlId="tags">
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
          {formError && <div style={{ color: 'red', marginTop: 10 }}>{formError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreate} appearance="primary" color="green">
            Create
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Model;
