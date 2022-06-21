import { Card, Stack, Heading, TextStyle } from '@shopify/polaris';

import ResourcePicker from './ResourcePicker';

import TagPicker from './AutoComplete';

import TextInputField from './TextInputField';

export default function DiscountGroup() {
  return (
    <div style={{ margin: '10px 0' }}>
      <Stack wrap={false} spacing="tight" distribution="center" alignment="center">
        <Stack.Item>
          <ResourcePicker />
        </Stack.Item>
        <Stack.Item>
          <TextStyle variation="strong">Includes</TextStyle>
        </Stack.Item>
        <Stack.Item fill>
          <TagPicker />
        </Stack.Item>
        <Stack.Item>
          <TextStyle variation="strong">Then</TextStyle>
        </Stack.Item>
        <Stack.Item fill>
          <TextInputField />
        </Stack.Item>
      </Stack>
    </div>
  );
}
