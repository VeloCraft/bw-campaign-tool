import { within, waitFor, userEvent } from '@storybook/test';

type FindFunc = 'testId' | 'role' | 'label';

const getElement = async (
  canvas: any,
  type: FindFunc,
  search: string,
  opts?: { [optionKey: string]: any },
) => {
  switch (type) {
    case 'testId':
      if (opts?.index > -1) {
        await canvas.findAllByTestId(search, opts);
        return canvas.getAllByTestId(search, opts)[opts.index];
      }
      await canvas.findByTestId(search, opts);
      return canvas.getByTestId(search, opts);
    case 'role':
      if (opts?.index > -1) {
        await canvas.findAllByRole(search, opts);
        return canvas.getAllByRole(search, opts)[opts.index];
      }
      await canvas.findByRole(search, opts);
      return canvas.getByRole(search, opts);
    case 'label':
      if (opts?.index > -1) {
        await canvas.findAllByLabelText(search, opts);
        return canvas.getAllByLabelText(search, opts)[opts.index];
      }
      await canvas.findByLabelText(search, opts);
      return canvas.getByLabelText(search, opts);
    default:
      return null;
  }
};

export const typing =
  (
    text: string,
    type: FindFunc,
    search: string,
    opts?: { [optionKey: string]: any },
  ) =>
  async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = await getElement(canvas, type, search, opts);
    await userEvent.type(element, text);
  };

export const click =
  (type: FindFunc, search: string, opts?: { [optionKey: string]: any }) =>
  async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = await getElement(canvas, type, search, opts);
    if (element) await userEvent.click(element);
  };

export const sequence =
  (
    actions: (() => ({
      canvasElement,
    }: {
      canvasElement: any;
    }) => Promise<void>)[],
  ) =>
  async ({ canvasElement }) => {
    for (const action of actions) {
      await action()({ canvasElement });
    }
  };

export const hover =
  (type: FindFunc, search: string, opts?: { [optionKey: string]: any }) =>
  async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = await getElement(canvas, type, search, opts);
    if (element)
      await waitFor(async () => {
        await userEvent.hover(element);
      });
  };

export const sleep = (ms: number) => async () => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export default click;
