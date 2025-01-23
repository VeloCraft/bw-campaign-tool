import React from 'react';
import { Button, Callout, Text, Box, Flex } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import useUpdateRoot from '@/hooks/useUpdateRootRoute';

type ReportsProps = {
  route: Route;
  onClose: () => void;
};

const fixDecimal = (level?: number) =>
  level ? Math.round(level * 100) / 100 : null;
const unique = (value: number, i: number, arr: number[]) =>
  value && arr.indexOf(value) === i;

const Reports = ({ route, onClose }: ReportsProps) => {
  const [updateRoute] = useUpdateDoc(`routes/${route.id}`, 'Route updated');
  const updateRoot = useUpdateRoot();

  const reports = React.useMemo(() => {
    return (route?.reports || []).reduce(
      (arr: number[], report: RouteReport) => {
        return [
          ...arr,
          fixDecimal(report.level) || (report.hazardous ? -1 : 0),
        ].filter(unique);
      },
      [] as number[],
    );
  }, [route.reports]);

  if (!reports.length) return null;

  const onSet = (value: number) => () => {
    const newValues = { updatedAt: new Date(), reports: [] } as Partial<Route>;
    if (value > -1) newValues.level = value;
    if (value === -1) newValues.hazardous = true;
    onClose();
    updateRoute(newValues);
    updateRoot(route.id, { ...route, ...newValues });
  };

  const onClear = () => {
    updateRoute({ updatedAt: new Date(), reports: [] });
    updateRoot(route.id, { ...route, updatedAt: new Date(), reports: [] });
  };

  return (
    <Box my="2">
      <Callout.Root mb="2" color="orange">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>New reports: Choose a level or clear</Callout.Text>
      </Callout.Root>
      <Flex direction="row" gap="2" wrap="wrap" align="center" justify="start">
        {reports.map((level: number) => (
          <Button
            onClick={onSet(level)}
            variant="outline"
            key={`level-${level}`}
          >
            {level}
          </Button>
        ))}
        <Button onClick={onClear} variant="ghost">
          <Text size="2">Clear</Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default Reports;
