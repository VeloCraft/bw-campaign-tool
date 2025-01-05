import React from 'react';

type WrapperProps = {
  component: React.ComponentType<any>;
  story: React.ComponentType<any>;
  props?: { [key: string]: any };
};

const Wrapper = ({
  component: Component,
  story: Story,
  props = {},
}: WrapperProps) => (
  <Component {...props}>
    <Story />
  </Component>
);

const decorator = (
  component: React.ComponentType<any>,
  props?: WrapperProps['props'],
) => {
  const Component = (Story: React.ComponentType<any>) => (
    <Wrapper props={props} component={component} story={Story} />
  );
  return Component;
};

export default decorator;
