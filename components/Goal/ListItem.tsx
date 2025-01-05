import React from 'react';

type ListItemProps = {
  title?: string;
};

const ListItem = ({ title = 'Hello world' }: ListItemProps) => {
  return (
    <div>{title}</div>
  );
};

export default ListItem;
