import React from 'react';

import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const CustomInput = ({ id, label, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
  </FormGroup>
);

export default CustomInput;
