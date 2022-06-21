import React, { useCallback, useState } from 'react';
import { TextField } from '@shopify/polaris';

export default function TextInputField() {
  const [value, setValue] = useState('');

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      type="number"
      suffix=" %"
      step={5}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}
