import React from 'react';
import useFirestoreDoc from '@/hooks/useFirestoreDoc';

const usePermissions = (
  permissions?: string[],
  user?: User,
): [boolean | null, boolean] => {
  const { data, loading } = useFirestoreDoc<AppPermissions>(
    permissions ? 'app/permissions' : null,
  );
  const isAllowed = React.useMemo(() => {
    if (!permissions) return true;
    if (loading || !data || !user) return null;
    const roles = user.roles.map((role) => data[role]).flat();
    return permissions.every((permission) => roles.includes(permission));
  }, [data, loading, permissions, user]);
  return [isAllowed, !!permissions && loading];
};

export default usePermissions;
