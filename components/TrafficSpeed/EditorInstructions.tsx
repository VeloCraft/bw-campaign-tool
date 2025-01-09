import React from 'react';
import { Popover, Callout } from '@radix-ui/themes';

const EditorInstructions = ({ open }: { open: boolean }) => {
  return (
    <Popover.Root defaultOpen={open}>
      <Popover.Content>
        <Callout.Root>
          <Callout.Text>
            Click on the map to select a start and <br />
            end point for a new segment, or click on <br />
            an existing segment to edit it.
          </Callout.Text>
        </Callout.Root>
      </Popover.Content>
    </Popover.Root>
  );
};

export default EditorInstructions;
