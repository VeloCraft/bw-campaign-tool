'use client';
import React from 'react';

const userContext = React.createContext<User | null>(null);
export const Provider = userContext.Provider;

export default userContext;
