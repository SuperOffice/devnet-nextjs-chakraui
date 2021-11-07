import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue as mode,
  VisuallyHidden,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Logo from '../../ui/Logo';
import { MobileNav } from './Mobile';
import { NavLink } from './NavLink';

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      bg={mode('white', 'gray.800')}
      w="100%"
      mb="16"
      id="f"
      //position="sticky"
      //top="0"
      zIndex="9999"
      shadow="md"
    >
      <Box
        py="4"
        px={{ base: '6', md: '8' }}
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
      >
        <Flex as="nav" justify="space-between">
          <HStack spacing="8">
            <Box as="a" href="#" rel="home" w="270px">
              <VisuallyHidden>Envelope app</VisuallyHidden>
              <Logo h="6" iconColor="teal.500" />
            </Box>
          </HStack>
          <HStack display={{ base: 'none', lg: 'flex' }} spacing="8">
            <NavLink.Desktop href="/#features">Features</NavLink.Desktop>
            <NavLink.Desktop href="#about">About</NavLink.Desktop>
            <NavLink.Desktop href="#pricing">Pricing</NavLink.Desktop>
            <NavLink.Desktop href="#faq">FAQ</NavLink.Desktop>
          </HStack>
          <Flex align="center">
            <HStack spacing="6" display={{ base: 'none', md: 'flex' }}>
              <IconButton
                isRound
                variant="ghost"
                aria-label="Color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
              />
              <NavLink.Desktop href="/login">Login</NavLink.Desktop>
              <Link href="/login">
                <Button colorScheme="teal">Start Free Trial</Button>
              </Link>
            </HStack>
            <Box ml="5">
              <MobileNav />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Nav;
