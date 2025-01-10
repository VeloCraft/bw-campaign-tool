import React from 'react';
import {
  Flex,
  IconButton,
  Button,
  Text,
  Box,
  ButtonProps,
} from '@radix-ui/themes';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@radix-ui/react-icons';

type EstimateProps = {
  onUpdate: (diff: number) => Promise<void>;
  onCancel: () => void;
  status: string;
  color: string;
};

const step = 0.1;

const Estimate = ({
  color,
  onUpdate: update,
  onCancel,
  status,
}: EstimateProps) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [diff, setDiff] = React.useState(status === 'flooded' ? 0 : step);
  const onChange = (dir: number) => () =>
    setDiff((prev) => Math.round((prev + dir * step) * 100) / 100);

  const onUpdate = async () => {
    setSubmitting(true);
    await update(diff * (status === 'flooded' ? -1 : 1));
    setSubmitting(false);
  };

  const stepButtons = [
    {
      Icon: DoubleArrowLeftIcon,
      value: -5,
      disabled: diff - 5 * step < (status === 'flooded' ? 0 : step),
    },
    {
      Icon: ChevronLeftIcon,
      value: -1,
      disabled: diff <= (status === 'flooded' ? 0 : step),
    },
    {
      Icon: ChevronRightIcon,
      value: 1,
      disabled: diff >= 2,
    },
    {
      Icon: DoubleArrowRightIcon,
      value: 5,
      disabled: diff + 5 * step > 2,
    },
  ];

  return (
    <>
      <Text size="4" color="gray" style={{ userSelect: 'none' }}>
        How much {status === 'flooded' ? 'higher' : 'lower'} is the current
        water level to where it {status === 'flooded' && 'first'} blocked this
        route?
      </Text>
      <Flex direction="row" my="4" gap="1" align="center" justify="center">
        {stepButtons.map(({ Icon, value, disabled }, index) => (
          <React.Fragment key={`${value}`}>
            <IconButton
              disabled={disabled}
              onClick={onChange(value)}
              color="gray"
              highContrast
              variant="soft"
              size="4"
              radius="full"
            >
              <Icon style={{ width: 24, height: 24 }} />
            </IconButton>
            {index === 1 && (
              <Text size="7" mx="1" style={{ userSelect: 'none' }}>
                {diff >= 1
                  ? diff.toFixed(2) + 'm'
                  : Math.round(diff * 100) + 'cm'}
              </Text>
            )}
          </React.Fragment>
        ))}
      </Flex>
      <Flex mt="6" direction="row" gap="2">
        <Button onClick={onCancel} size="3" color="gray" variant="outline">
          Back
        </Button>
        <Box flexGrow="1" />
        <Button
          onClick={onUpdate}
          loading={!!submitting}
          size="3"
          color={color as ButtonProps['color']}
        >
          Report as {status}
        </Button>
      </Flex>
    </>
  );
};

export default Estimate;
