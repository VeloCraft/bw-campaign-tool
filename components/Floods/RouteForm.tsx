import React from 'react';
import Form, { Field } from '@/components/Form';
import { Button, Dialog, type ButtonProps } from '@radix-ui/themes';

type RouteFormProps = ButtonProps & {
  onUpdate: (data: FormSubmission) => Promise<void>;
  initialValues: FormValues;
  title: string;
  stations: Station[];
};

const RouteForm = ({
  title,
  onUpdate,
  initialValues,
  stations,
  ...props
}: RouteFormProps) => {
  const [stationIds, stationNames] = React.useMemo(() => {
    if (!stations) return [[], []];
    return [
      stations.map((station) => station.id),
      stations.map(
        (station) => `${station.locationName} (${station.riverName})`,
      ),
    ];
  }, [stations]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button data-testid="route-form-edit-button" {...props} />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>
          Set the flood level for this route.
        </Dialog.Description>
        <Form
          variant="dialog"
          initialValues={initialValues}
          onSubmit={onUpdate}
        >
          <Field name="level" type="number" required label="Flood level" />
          <Field
            name="nearestStations.0"
            required
            label="Nearest station (closest)"
            type="select"
            values={stationIds}
            labels={stationNames}
            mb="4"
          />
          <Field
            name="nearestStations.1"
            required
            label="Nearest station (next closest)"
            type="select"
            values={stationIds}
            labels={stationNames}
            mb="4"
          />
        </Form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default RouteForm;
