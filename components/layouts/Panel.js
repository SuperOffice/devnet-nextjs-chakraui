import React from 'react';
import { Flex } from '@chakra-ui/react';

export default function LayoutPanel(props) {
  return (
    <Flex direction="column" align="center" m="0 auto" {...props}>
      {props.children}
    </Flex>
  );
}
