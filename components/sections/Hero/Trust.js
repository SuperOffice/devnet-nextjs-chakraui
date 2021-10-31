import React from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  useColorModeValue as mode,
  Stack,
} from '@chakra-ui/react';
import * as Logos from './Brands';

export const Trust = () => {
  return (
    <Box as="section" pt="12">
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          spacing={16}
        >
          <Text
            fontWeight="bold"
            fontSize="md"
            textAlign="center"
            textTransform="uppercase"
            letterSpacing="wide"
            color={mode('gray.600', 'gray.400')}
          >
            Trusted by over 1,000 companies
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 3, lg: 6 }}
            color="gray.500"
            alignItems="center"
            justifyItems="center"
            spacing={{ base: '12', lg: '24' }}
            fontSize="2xl"
          >
            <Logos.ChatMonkey />
            <Logos.Wakanda />
            <Logos.Lighthouse />
            <Logos.Plumtic />
            <Logos.WorkScout />
            <Logos.Finnik />
          </SimpleGrid>
        </Stack>
      </Box>
    </Box>
  );
};
