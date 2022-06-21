import React, { useCallback, useState } from 'react';
import { Select } from '@shopify/polaris';

export default function ResourcePicker() {
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: 'Product Tag', value: 'product' },
    { label: 'Customer Tag', value: 'customer' },
  ];

  return <Select options={options} onChange={handleSelectChange} value={selected} />;
}
