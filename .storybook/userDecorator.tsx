import { Provider } from '@/contexts/User';
import generate from '@/.storybook/generator';

const userDecorator =
  (user: Partial<User> = {}) =>
  (Story: any) => {
    const u = { ...generate('user'), ...user } as User;
    return (
      <Provider value={u}>
        <Story />
      </Provider>
    );
  };

export default userDecorator;
