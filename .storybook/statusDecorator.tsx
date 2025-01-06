import { Provider } from '@/contexts/Status';

const statusDecorator = (status: Status) => (Story: any) => {
  return (
    <Provider value={status}>
      <Story />
    </Provider>
  );
};

export default statusDecorator;
