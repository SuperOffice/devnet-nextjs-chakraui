import * as React from 'react';
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Image,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaPlayCircle } from 'react-icons/fa';
import { SampleLogo } from './SampleLogo';
import { Testimonial } from './Testimonial';
import { Trust } from './Trust';

const Feature = (props) => {
  const { title, children } = props;
  return (
    <Stack>
      <Text fontWeight="bold">{title}</Text>
      <Text>{children}</Text>
    </Stack>
  );
};

const Hero = () => {
  return (
    <Box as="section">
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <Grid templateColumns={{ base: '1fr', md: '360px 1fr' }} gap="64px">
          <Box>
            <Heading size="3xl" letterSpacing="tight" fontWeight="extrabold">
              SuperOffice Example App
            </Heading>
            <Text
              mt="6"
              mb="8"
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="medium"
            >
              Built with Next.js and Chakra UI 🤟
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }}>
              <Button size="lg" colorScheme="teal" w="250px" h="50px">
                Add app
              </Button>
              <Button size="lg" w="250px" h="50px">
                Learn more
              </Button>
            </Stack>
            <Testimonial
              logo={<SampleLogo />}
              author="Dennis Pabst"
              company="Consultant"
              image="https://avatars.githubusercontent.com/u/66716418?v=4"
            >
              &ldquo; At volutpat diam ut venenatis tellus. Sit amet consectetur
              adipiscing elit duis. Quis hendrerit dolor magna eget est. &rdquo;
            </Testimonial>
          </Box>
          <Box>
            <Center
              bg={mode('white', 'gray.700')}
              shadow="xl"
              minH={{ base: '320px', lg: '480px' }}
              rounded="lg"
              _hover={{ cursor: 'pointer' }}
              borderWidth={mode('1px', '0px')}
              borderColor="gray.100"
            >
              {/* Replace this with your screenshot */}
              <Box
                as={FaPlayCircle}
                fontSize="80px"
                color="teal.300"
                position="absolute"
              />
            </Center>
            <SimpleGrid
              rounded="lg"
              mt="8"
              p={{ base: '10', lg: '0' }}
              columns={{ base: 1, lg: 3 }}
              spacing="6"
              bg={{ base: mode('gray.100', 'gray.700'), lg: 'unset' }}
            >
              <Feature title="Duis aute irure dolor">
                At volutpat diam ut venenatis tellus. Sit amet consectetur
                adipiscing elit duis.
              </Feature>
              <Feature title="Excepteur sint occaecat">
                Vestibulum sed arcu non odio euismod. Tristique senectus et
                netus et malesuada.
              </Feature>
              <Feature title="Itaque cupiditate adipisci">
                Convallis a cras semper auctor. Curabitur vitae nunc sed velit.
              </Feature>
            </SimpleGrid>
          </Box>
        </Grid>
        <Trust />
      </Box>
    </Box>
  );
};

export default Hero;
