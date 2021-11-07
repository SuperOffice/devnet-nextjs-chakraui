import React from 'react';
import {
  Box,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { DurationSwitcher } from './Switcher';
import { PricingCard } from './Card';

const FeatureItem = ({ children }) => (
  <HStack>
    <Box flexShrink={0} as={CheckIcon} fontSize="xl" color="teal" />
    <Text>{children}</Text>
  </HStack>
);

const Pricing = () => {
  return (
    <Box id="pricing" as="section" w="100%">
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <Text
          color={mode('teal.500', 'teal.300')}
          fontWeight="bold"
          maxW="xl"
          mx="auto"
          textAlign={{ sm: 'center' }}
        >
          30 days free trial
        </Text>
        <Heading
          as="h1"
          size="2xl"
          fontWeight="extrabold"
          textAlign={{ sm: 'center' }}
          mt="4"
        >
          Pricing
        </Heading>
        <Text
          mt="4"
          maxW="xl"
          mx="auto"
          fontSize="xl"
          color={mode('gray.600', 'gray.400')}
          textAlign={{ sm: 'center' }}
        >
          Start free, then grow with us and unlock additional features.
        </Text>
        <DurationSwitcher mt="8" />
        <SimpleGrid
          alignItems="flex-start"
          mt={{ base: '10', lg: '24' }}
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: '12', lg: '8' }}
        >
          <PricingCard
            name="Basic"
            description="Lorem ipsum dolor sit amet"
            price={'?'}
            features={[
              'Sapiente libero doloribus modi',
              'Vel ipsa esse repudiandae1',
              'Itaque cupiditate adipisci',
            ]}
            href="/login"
          />
          <PricingCard
            popular
            name="Premium"
            description="Lorem ipsum dolor sit amet"
            price={'??'}
            features={[
              'Duis aute irure dolor repreht',
              'Excepteur sint occa cupidatat',
              'Vel ipsa esse andae excepturi',
              'Itaque cupiditate adipisci quim',
            ]}
            href="/login"
          />
          <PricingCard
            name="Super"
            description="Lorem ipsum dolor sit amet"
            price={'???'}
            features={[
              'Duis aute irure dolor',
              'Excepteur sint occaecat',
              'Vel ipsa esse repudiandae2',
            ]}
            href="/login"
          />
        </SimpleGrid>
        <Box
          mt="10"
          bg={mode('white', 'gray.700')}
          shadow="2xl"
          rounded="lg"
          px="10"
          pt="10"
          pb="12"
          mx="auto"
          maxW={{ base: 'lg', lg: 'unset' }}
        >
          <Text
            color={mode('teal.500', 'teal.300')}
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wide"
          >
            Features &amp; Services
          </Text>
          <Text fontSize="3xl" mt="2" fontWeight="bold">
            Included in all plans
          </Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} mt="5" spacing="5">
            <FeatureItem>Sapiente libero doloribus modi</FeatureItem>
            <FeatureItem>Excepteur sint occa cupidatat</FeatureItem>
            <FeatureItem>
              Individual limits and policies for each person
            </FeatureItem>
            <FeatureItem>Vel ipsa esse andae excepturi</FeatureItem>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Pricing;
