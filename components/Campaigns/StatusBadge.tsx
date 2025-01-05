import { Badge, type BadgeProps } from '@radix-ui/themes';
import React from 'react';

type StatusBadgeProps = BadgeProps & {
  status: 'active' | 'inactive';
};

const StatusBadge = ({ status, ...props }: StatusBadgeProps) => {
  const statusMap = {
    active: {
      color: 'orange',
      label: 'Active',
    },
    inactive: {
      color: 'gray',
      label: 'Inactive',
    },
  };

  const statusData = statusMap[status] || { color: 'gray', label: 'Unknown' };

  return (
    <Badge {...props} color={statusData.color as BadgeProps['color']}>
      {statusData.label}
    </Badge>
  );
};

export default StatusBadge;
