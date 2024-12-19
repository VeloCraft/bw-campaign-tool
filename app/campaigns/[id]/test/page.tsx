'use client'
import React from 'react';
import Page from '@/components/Campaigns/Page'

const Test = ( {params} : {params: {id: string}} ) => {
  const newParams = React.use(params)
  return <Page docId={newParams.id} />
}
