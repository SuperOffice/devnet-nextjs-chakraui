import {
  Box,
  createIcon,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FeatureLink } from './FeatureLink';
import { links } from './links';

export const RightArrow = createIcon({
  viewBox: '0 0 11 12',
  d: 'M0 0L4.8 6L0 12H5.78182L10.5818 6L5.78182 0H0Z',
});

const Features = () => {
  return (
    <Box id="features" as="section">
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between">
          <Box flex="1" maxW={{ lg: 'xl' }}>
            <Img
              htmlWidth="560px"
              htmlHeight="430px"
              w="100%"
              h="100%"
              objectFit="cover"
              src="/hero.png"
              rounded="lg"
              shadow="2xl"
            />
          </Box>
          <Box
            ms={{ lg: '12' }}
            mt={{ base: '12', lg: 0 }}
            flex="1"
            maxW={{ lg: 'xl' }}
          >
            <Box maxW={{ base: 'xl', lg: 'unset' }} textAlign="right">
              <Box as="b" color={mode('teal.500', 'teal.300')}>
                Everything you need
              </Box>
              <Heading
                mt="4"
                mb="6"
                size="2xl"
                fontWeight="extrabold"
                lineHeight="1.2"
              >
                Features
              </Heading>
              <Text fontSize="lg" color={mode('gray.600', 'gray.400')}>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet. Velit officia consequat duis enim velit mollit.
              </Text>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} mt="8">
              {links.map((link) => (
                <Flex
                  key={link.label}
                  align="center"
                  minH="14"
                  borderBottomWidth="1px"
                >
                  <FeatureLink href={link.href}>{link.label}</FeatureLink>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Features;
