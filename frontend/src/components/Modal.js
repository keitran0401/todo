import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { Autocomplete, StandaloneSearchBox } from '@react-google-maps/api';

function CustomModal(props) {
  const { toggle, onSave } = props;
  const [activeItem, setActiveItem] = useState(props.activeItem);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    let activeItem = {};
    if (name === 'location') {
      activeItem = {
        ...activeItem,
        location: { ...activeItem.location, city: value },
      };
    } else {
      activeItem = { ...activeItem, [name]: value };
    }

    setActiveItem({ activeItem });
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log('here', autocomplete.getPlaces().formatted_address);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <Modal zIndex={1300} isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">City</Label>
            <StandaloneSearchBox
              onLoad={(autocomplete) => setAutocomplete(autocomplete)}
              onPlacesChanged={onPlaceChanged}
            >
              <Input
                type="text"
                name="location"
                // value={activeItem.location.city}
                placeholder="Enter Todo city"
              />
            </StandaloneSearchBox>
          </FormGroup>
          <FormGroup check>
            <Label for="completed">
              <Input
                type="checkbox"
                name="completed"
                checked={activeItem.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
