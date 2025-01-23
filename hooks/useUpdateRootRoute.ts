import useUpdateDoc from '@/hooks/useUpdateDoc';

const useRootUpdate = () => {
  const [onUpdate] = useUpdateDoc(`floods/root`);

  const onUpdateRoot = async (routeId: string, values: Partial<Route>) => {
    const { id, ...rest } = values; // eslint-disable-line @typescript-eslint/no-unused-vars
    await onUpdate({ [routeId]: rest });
  };

  return onUpdateRoot;
};

export default useRootUpdate;
