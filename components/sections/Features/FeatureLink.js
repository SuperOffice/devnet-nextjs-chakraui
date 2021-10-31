import * as React from 'react';
import {
  Box,
  HStack,
  StackProps,
  HTMLChakraProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

export const FeatureLink = (props) => {
  const { children, ...rest } = props;
  return (
    <HStack
      as="a"
      align="center"
      fontSize="md"
      className="group"
      cursor="pointer"
      {...rest}
    >
      <Box fontWeight="semibold">{children}</Box>
      <ArrowRightIcon
        color={mode('teal.500', 'teal.400')}
        fontSize="sm"
        transition="transform 0.2s"
        pos="relative"
        top="2px"
        _groupHover={{ transform: 'translateX(2px)' }}
      />
    </HStack>
  );
};
