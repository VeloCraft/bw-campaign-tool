import { Flex } from '@radix-ui/themes';

type WrapperProps = {
  variant?: 'centered' | 'top';
  children: React.ReactNode;
};
const Wrapper = ({ variant = 'top', children }: WrapperProps) => {
  return (
    <Flex
      width="100%"
      height="100dvh"
      direction="column"
      justify={variant === 'centered' ? 'center' : 'start'}
      align={variant === 'centered' ? 'center' : 'start'}
    >
      {children}
    </Flex>
  );
};

export default Wrapper;
