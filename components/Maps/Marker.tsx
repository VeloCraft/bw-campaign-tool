import React from 'react';

type MarkerProps = {
  title?: string;
};

const Marker = ({ title = 'Hello world' }: MarkerProps) => {
  return (
    <div>{title}</div>
  );
};

export default Marker;
