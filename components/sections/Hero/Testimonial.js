import * as React from 'react';
import {
  Box,
  BoxProps,
  HStack,
  Img,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export const Testimonial = (props) => {
  const { logo, author, company, image, children, ...rest } = props;
  return (
    <Box
      rounded="lg"
      mt={{ base: '16', md: '24', lg: '12' }}
      as="blockquote"
      bg={{ lg: mode('white', 'gray.700') }}
      p={{ lg: '8' }}
      shadow={{ base: 'unset', lg: 'xl' }}
      {...rest}
    >
      {logo}
      <Text mt="4" fontSize="lg" lineHeight="tall">
        {children}
      </Text>
      <HStack spacing="4" mt="8">
        <Img
          alt={author}
          w="12"
          h="12"
          rounded="full"
          objectFit="cover"
          src={image}
        />
        <Box>
          <Text as="cite" fontStyle="normal" fontWeight="bold">
            {author}
          </Text>
          <Text color={mode('gray.600', 'gray.400')}>{company}</Text>
        </Box>
      </HStack>
    </Box>
  );
};
