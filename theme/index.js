import { extendTheme } from '@chakra-ui/react';

const overrides = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};

const theme = extendTheme(overrides);

export default extendTheme(overrides);
