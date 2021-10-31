import React from 'react';
import Link from 'next/link';
import { Box, HStack, Text } from '@chakra-ui/react';
import { IoShapes } from 'react-icons/io5';

export default function Logo(props) {
  const { iconColor } = props;
  return (
    <Link href="/">
      <HStack spacing="3">
        <Box as={IoShapes} fontSize="3xl" color={iconColor} />
        <Text textTransform="uppercase" fontWeight="bold">
          Logo
        </Text>
      </HStack>
    </Link>
  );
}
