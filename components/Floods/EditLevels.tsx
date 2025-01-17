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
  disabled: boolean;
  onClose: () => void;
  onRemove: () => Promise<void>;
  onSetCurrent: () => Promise<void>;
  onUpdate: (data: FormSubmission) => Promise<void>;
  route: Route;
  stations: Station[];
};

const EditLevels = ({
  disabled,
  onClose,
  onRemove,
  onSetCurrent,
  onUpdate,
  route,
  stations,
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
            data-testid="delete-route-button"
          >
            <TrashIcon />
          </RemoveRoute>
        </Box>
        <CurrentLevel
          onClick={onSetCurrent}
          disabled={disabled}
          size="2"
          variant="soft"
          data-testid="set-route-current-button"
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
          data-testid="edit-route-button"
        >
          Edit level
        </RouteForm>
      </Flex>
    </Box>
  );
};

export default EditLevels;
