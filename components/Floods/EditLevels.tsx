import React from 'react';
import RouteForm from '@/components/Floods/RouteForm';
import CurrentLevel from '@/components/Floods/CurrentLevel';
import RemoveRoute from '@/components/Floods/RemoveRoute';
import { Box, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import Reports from '@/components/Floods/Reports';

const initialValues = {
  level: 5,
};

type EditLevelsProps = {
  route: Route;
  onSetCurrent: () => Promise<void>;
  onRemove: () => Promise<void>;
  disabled: boolean;
  onUpdate: (data: FormSubmission) => Promise<void>;
  stations: Station[];
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
};

const EditLevels = ({
  disabled,
  route,
  onUpdate,
  onSetCurrent,
  onRemove,
  stations,
  onClose,
}: EditLevelsProps) => {
  return (
    <Box>
      <Reports onClose={onClose} route={route} />
      <Flex direction="row" gap="4px" mt="4">
        <Box flexGrow="1">
          <RemoveRoute
            onClick={onRemove}
            disabled={disabled}
            color="red"
            size="2"
            variant="outline"
          >
            <TrashIcon />
          </RemoveRoute>
        </Box>
        <CurrentLevel
          onClick={onSetCurrent}
          disabled={disabled}
          size="2"
          variant="soft"
        >
          Set to current
        </CurrentLevel>
        <RouteForm
          initialValues={{ ...initialValues, ...route }}
          onUpdate={onUpdate}
          disabled={disabled}
          title={`${route.summary}: Edit level`}
          size="2"
          stations={stations}
        >
          Edit level
        </RouteForm>
      </Flex>
    </Box>
  );
};

export default EditLevels;
