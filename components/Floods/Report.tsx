import React from 'react';
import {
  Text,
  Heading,
  Box,
  Dialog,
  Badge,
  Button,
  Theme,
  Flex,
  Spinner,
} from '@radix-ui/themes';
import useRouteStatus from '@/hooks/useRouteStatus';
import useUpdateDoc from '@/hooks/useUpdateDoc';
import Estimate from '@/components/Floods/Estimate';
import ReportButton from '@/components/Floods/ReportButton';
import { auth } from '@/helpers/firebase';
import { signInAnonymously } from 'firebase/auth';
import { toISOString } from '@/helpers/date';
import { useLocalstorageState } from 'rooks';

type ReportProps = {
  route: Route;
  stations: Station[];
  onClose: () => void;
};

const colors = {
  clear: 'jade',
  flooded: 'red',
  hazardous: 'orange',
};

const labels = {
  clear: 'Clear',
  flooded: 'Flooded',
  hazardous: 'Hazardous',
};

const descriptions = {
  clear: 'Route is passable by walking and cycling',
  flooded: 'Route is impassable due to flooding',
  hazardous: 'Water has receeded but path is unsafe to use',
};

const sleep = (delay: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const Report = ({ route, stations, onClose }: ReportProps) => {
  const [open, setOpen] = React.useState(false);
  const [status, level] = useRouteStatus(route, stations, false);
  const [updateDoc] = useUpdateDoc(`routes/${route.id}`);
  const [localReports, setLocalReports] = useLocalstorageState<LocalReports>(
    'reports',
    {},
  );
  const [diffOpen, setDiffOpen] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const options =
    status === 'flooded'
      ? ['clear', 'hazardous']
      : status === 'hazardous'
        ? ['clear', 'flooded']
        : ['flooded'];

  const onSave = async (newStatus: string, diff: number = 0.01) => {
    setSubmitting(true);
    const newLevel =
      newStatus === 'clear' && !route.hazardous
        ? level + diff
        : newStatus === 'flooded'
          ? level + diff
          : newStatus === 'hazardous' && status === 'flooded'
            ? level + diff
            : route.level;
    const hazardous = newStatus === 'hazardous';
    const values = { userId: auth.currentUser.uid, level: newLevel, hazardous };
    const newReports = (route.reports || []).filter(
      (report) => report.userId !== auth.currentUser.uid,
    );
    await updateDoc({ reports: [...newReports, values] });
    setLocalReports({
      ...localReports,
      [route.id]: {
        level: newLevel,
        hazardous,
        timestamp: toISOString(route.updatedAt),
      } satisfies LocalReport,
    });
    setSuccess(true);
  };

  const onUpdate = (newStatus: string) => () => {
    onSave(newStatus, newStatus === 'flooded' ? 0 : 0.01);
  };

  const onUpdateDiff = (diff: number) => onSave(diffOpen, diff);

  const onOpenDiff = (newStatus: string) => () => setDiffOpen(newStatus);
  const onCloseDiff = () => setDiffOpen(null);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    setDiffOpen(null);
  };

  const onDone = () => {
    setOpen(false);
    sleep().then(() => {
      setDiffOpen(null);
      setSuccess(false);
      setSubmitting(false);
      onClose();
    });
  };

  React.useEffect(() => {
    if (auth.currentUser?.uid) return;
    signInAnonymously(auth);
  }, []);

  return (
    <Flex direction="column" gap="4">
      <Badge variant="solid" size="3" color={colors[status]}>
        Status: {labels[status]}
      </Badge>
      <Flex direction="row" align="center" gap="2">
        <Box asChild flexGrow="1">
          <Text m="2" size={{ xs: '2', sm: '4' }}>
            Incorrect?
          </Text>
        </Box>
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <Dialog.Trigger>
            <Button size="2" variant="soft" color="crimson">
              Report a change
            </Button>
          </Dialog.Trigger>
          <Theme appearance="inherit" accentColor="jade">
            <Dialog.Content>
              <Dialog.Title hidden={success}>Report a change</Dialog.Title>
              <Dialog.Description hidden>
                Choose a new status for this route
              </Dialog.Description>
              {!submitting && !diffOpen && (
                <>
                  <Text size="4" color="gray" style={{ userSelect: 'none' }}>
                    Long-press to report a precise flood level
                  </Text>
                  <Flex mt="4" direction="column" gap="2">
                    {options.map((key) => (
                      <ReportButton
                        key={key}
                        label={labels[key]}
                        description={descriptions[key]}
                        color={colors[key]}
                        onClick={onUpdate(key)}
                        onLongPress={onOpenDiff(key)}
                      />
                    ))}
                  </Flex>
                </>
              )}
              {!submitting && diffOpen && (
                <Estimate
                  onUpdate={onUpdateDiff}
                  onCancel={onCloseDiff}
                  status={diffOpen}
                  color={colors[diffOpen as keyof typeof colors]}
                />
              )}
              {submitting && (
                <>
                  {success ? (
                    <>
                      <Heading size="8">Report received. Thanks!</Heading>
                      <Flex mt="6" justify="end" direction="row" gap="2">
                        <Button
                          onClick={onDone}
                          size="3"
                          color="gray"
                          variant="outline"
                        >
                          Done
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <Flex
                      align="center"
                      justify="center"
                      direction="row"
                      width="240"
                      height="240"
                    >
                      <Spinner style={{ width: 64, height: 64 }} />
                    </Flex>
                  )}
                </>
              )}
            </Dialog.Content>
          </Theme>
        </Dialog.Root>
      </Flex>
    </Flex>
  );
};

export default Report;
