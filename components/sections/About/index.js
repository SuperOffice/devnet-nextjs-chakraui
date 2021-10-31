import * as React from 'react';
import {
  Box,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { Member } from './Member';
import { members } from './members';

const About = () => (
  <Box id="about" as="section">
    <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
      <Grid
        templateColumns={{ base: '1fr', lg: '24rem 1fr' }}
        gap={{ base: '8', md: '12', lg: '16' }}
      >
        <Box>
          <Box as="b" color={mode('teal.500', 'teal.300')}>
            Meet our team
          </Box>
          <Heading
            size="2xl"
            letterSpacing="tight"
            mt="4"
            mb="6"
            fontWeight="extrabold"
          >
            About
          </Heading>
          <Text
            fontSize="xl"
            maxW="2xl"
            color={mode('gray.600', 'gray.400')}
            mb="6"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </Text>
          <Text fontSize="xl" maxW="2xl" color={mode('gray.600', 'gray.400')}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </Text>
          <HStack
            mt="8"
            as="a"
            display="inline-flex"
            href="#"
            className="group"
            fontSize="lg"
            fontWeight="bold"
            color={mode('teal.600', 'teal.300')}
          >
            <span>Join now</span>
            <Box
              as={FaArrowRight}
              transition="all 0.2s"
              _groupHover={{ transform: 'translateX(5px)' }}
            />
          </HStack>
        </Box>
        <SimpleGrid
          mt={{ base: '8', md: '0' }}
          columns={{ base: 1, md: 2 }}
          spacing="10"
        >
          {members.map((member, index) => (
            <Member
              key={index}
              image={member.image}
              role={member.role}
              name={member.name}
              twitter="#"
              linkedIn="#"
            >
              {member.description}
            </Member>
          ))}
        </SimpleGrid>
      </Grid>
    </Box>
  </Box>
);

export default About;
