import { ThemeProvider } from 'next-themes';
import '@/app/globals.css';
import { Theme } from '@radix-ui/themes';

interface ComponentProps<W extends React.ComponentType<any>> {
  wrapper: W;
  children?: React.ReactNode;
}

const Component = <W extends React.ComponentType<any>>({
  children,
  wrapper: Wrapper,
  ...wrapperProps
}: React.PropsWithChildren<ComponentProps<W> & React.ComponentProps<W>>) => (
  <Wrapper {...wrapperProps}>
    <ThemeProvider attribute="class">
      <Theme accentColor="green">{children}</Theme>
    </ThemeProvider>
  </Wrapper>
);

export default Component;
