import React from 'react';

type InfoWindowProps = {
  title?: string;
};

const InfoWindow = ({ title = 'Hello world' }: InfoWindowProps) => {
  return (
    <div>{title}</div>
  );
};

export default InfoWindow;
