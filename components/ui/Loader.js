import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export default function Logo(props) {
  return (
    <Center h="90vh">
      <Spinner
        thickness="8px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        w="80px"
        h="80px"
      />
    </Center>
  );
}
