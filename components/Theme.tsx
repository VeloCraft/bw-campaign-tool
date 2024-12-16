import { ThemeProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';
import '@/app/globals.css';

// eslint-disable-next-line
interface ComponentProps<W extends React.ComponentType<any>> {
  wrapper: W;
  children?: React.ReactNode;
}

// eslint-disable-next-line
const Component = <W extends React.ComponentType<any>>({
  children,
  wrapper: Wrapper,
  ...wrapperProps
}: React.PropsWithChildren<ComponentProps<W> & React.ComponentProps<W>>) => (
  <Wrapper {...wrapperProps}>
    <ThemeProvider attribute="class">
      <Theme accentColor="teal">{children}</Theme>
    </ThemeProvider>
  </Wrapper>
);

export default Component;
