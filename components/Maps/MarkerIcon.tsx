import React from 'react';

type MarkerIconProps = {
  title?: string;
};

const MarkerIcon = ({ title = 'Hello world' }: MarkerIconProps) => {
  return (
    <div>{title}</div>
  );
};

export default MarkerIcon;
