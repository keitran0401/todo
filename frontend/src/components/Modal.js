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
import { StandaloneSearchBox } from '@react-google-maps/api';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function CustomModal(props) {
  const { toggle, onSave } = props;
  const [activeItem, setActiveItem] = useState(props.activeItem);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    let activeItemTemp = { ...activeItem };
    if (name === 'location') {
      activeItemTemp = {
        ...activeItem,
        location: { ...activeItem.location, name: value },
      };
    } else if (name === 'file') {
      activeItemTemp = {
        ...activeItem,
        selectedFile: e.target.files[0],
      };
    } else {
      activeItemTemp = { ...activeItem, [name]: value };
    }

    setActiveItem(activeItemTemp);
  };

  const onPlacesChanged = () => {
    if (autocomplete) {
      setActiveItem({
        ...activeItem,
        location: {
          ...activeItem.location,
          name: autocomplete.getPlaces()[0].formatted_address,
        },
      });
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
            <Label for="location">
              City
              <span>
                <Tooltip title="If Google Maps API works correctly and I still have a free version, you can search for a location with autocomplete field. Otherwise, just skip this part.">
                  <IconButton>
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
              </span>
            </Label>
            <StandaloneSearchBox
              onLoad={(autocomplete) => setAutocomplete(autocomplete)}
              onPlacesChanged={onPlacesChanged}
            >
              <Input
                type="text"
                name="location"
                placeholder="Enter Todo city"
              />
            </StandaloneSearchBox>
          </FormGroup>
          <FormGroup>
            <Label for="file">Upload File</Label>
            <Input
              type="file"
              name="file"
              onChange={handleChange}
              // invalid={invalidFile}
            />
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
