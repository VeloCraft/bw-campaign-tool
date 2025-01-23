import { type ButtonProps, Button } from '@radix-ui/themes';

type FilterProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  editable?: boolean;
};

const fade = 0.6;

const Filter = ({ editable, value, onChange }: FilterProps) => {
  const onClick = (value: FilterValue) => () => onChange(value);
  const items = [
    { label: 'All', value: 'all', color: 'gray' },
    { label: 'Clear', value: 'clear', color: 'jade', editable: false },
    {
      label: 'Hazardous',
      value: 'hazardous',
      color: 'orange',
      editable: false,
    },
    { label: 'Flooded', value: 'flooded', color: 'red', editable: false },
    { label: 'New reports', value: 'reports', color: 'blue', editable: true },
  ].filter((item) => item.value === 'all' || editable === item.editable);

  return (
    <>
      {items.map((item) => (
        <Button
          key={item.value}
          size="1"
          onClick={onClick(item.value as FilterValue)}
          color={item.color as ButtonProps['color']}
          variant="solid"
          style={{
            boxShadow: 'var(--shadow-3)',
            opacity: value === item.value ? 1 : fade,
          }}
        >
          {item.label}
        </Button>
      ))}
    </>
  );
};

export default Filter;
