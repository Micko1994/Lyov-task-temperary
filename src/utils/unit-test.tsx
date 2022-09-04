import { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'overmind-react';
import { store } from 'store';

const AllTheProviders: FC = ({ children }: { children?: ReactNode }) => {
  return (
      <Provider value={store}>{children}</Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
