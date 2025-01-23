import React from 'react';
import { Flex, Switch, Text } from '@radix-ui/themes';

type ShareProps = {
  onChange: (value: boolean) => void;
  defaultValue: boolean;
  error?: boolean;
};

const Share = ({ error, onChange, defaultValue }: ShareProps) => {
  return (
    <Flex direction="row" justify="center">
      <Text as="label" size="2">
        <Flex gap="2" my="3">
          <Switch
            disabled={error}
            size="2"
            onCheckedChange={onChange}
            defaultChecked={defaultValue}
          />{' '}
          {error
            ? 'Unabled to share location'
            : 'Share location with other Bike Busers'}
        </Flex>
      </Text>
    </Flex>
  );
};

export default Share;
