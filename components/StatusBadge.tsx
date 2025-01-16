import { Badge } from '@radix-ui/themes';
import React from 'react';

export default function StatusBadge({ status }: { status: string }) {
  const statusMap = {
    active: {
      color: 'orange',
      label: 'Active',
    },
    inactive: {
      color: 'gray',
      label: 'Inactive',
    },
    pending: {
      color: 'orange',
      label: 'Pending',
    },
    inprogress: {
      color: 'blue',
      label: 'In Progress',
    },
    complete: {
      color: 'green',
      label: 'Completed',
    },
  };

  const statusData = statusMap[status] || { color: 'gray', label: 'Unknown' };

  return <Badge color={statusData.color}>{statusData.label}</Badge>;
}
