import { Text, Heading, Box, Button, type ButtonProps } from '@radix-ui/themes';
import { useOnLongPress } from 'rooks';

type ReportButtonProps = {
  label: string;
  description: string;
  color: ButtonProps['color'];
  onClick: () => void;
  onLongPress: () => void;
};

const ReportButton = ({
  label,
  description,
  color,
  onClick,
  onLongPress,
}: ReportButtonProps) => {
  const ref = useOnLongPress(onLongPress);
  return (
    <Button
      size="3"
      variant="solid"
      color={color}
      ref={ref}
      onClick={onClick}
      style={{
        height: 'auto',
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'column',
      }}
    >
      <Heading size="7">{label}</Heading>
      <Box asChild display="block">
        <Text size="2">{description}</Text>
      </Box>
    </Button>
  );
};

export default ReportButton;
