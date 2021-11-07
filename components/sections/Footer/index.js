import * as React from 'react';
import Link from 'next/link';
import {
  chakra,
  Box,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Button,
  useColorModeValue as mode,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { FaHeart, FaBrain } from 'react-icons/fa';
import { LanguageSwitcher } from './LanguageSwitcher';
import Logo from '../../ui/Logo';
import { SocialButton } from './SocialButton';
import { footerLinks, links, socialLinks } from './links';

const Footer = () => (
  <Box
    as="footer"
    bg={mode('teal', 'teal.900')}
    color="white"
    py="64px"
    w="100%"
    mt="16"
  >
    <Box maxW="7xl" px="8" mx="auto">
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        pb="8"
        align="flex-start"
        id="top"
      >
        <Box paddingEnd="12" mb={{ base: '12', lg: 0 }}>
          <Logo color="white" h="6" />
          <HStack spacing="4" mt="8" as="ul">
            {socialLinks.map((link, idx) => (
              <SocialButton key={idx} href={link.href}>
                <Box srOnly>{link.label}</Box>
                {link.icon}
              </SocialButton>
            ))}
          </HStack>
          <Text mt="8" fontSize="sm">
            Crafted with Love
          </Text>
        </Box>
        <SimpleGrid
          w="full"
          maxW={{ base: 'unset', lg: '2xl' }}
          columns={{ base: 2, lg: 4 }}
          spacing={{ base: '8', md: '4' }}
          fontSize="sm"
        >
          {links.map((group, idx) => (
            <Box key={idx}>
              <Text fontWeight="bold" mb="4">
                {group.title}
              </Text>
              <Stack as="ul" listStyleType="none">
                {group.links.map((link, idx) => (
                  <Box as="li" key={idx}>
                    <Box
                      as="a"
                      href={link.href}
                      _hover={{ textDecor: 'underline' }}
                    >
                      {link.label}
                      {link.badge && (
                        <Box as="span" marginStart="2">
                          {link.badge}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
      <Divider my="10" borderColor="teal.300" />
      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        align={{ base: 'flex-start', lg: 'center' }}
        justify="space-between"
        fontSize="sm"
      >
        <Wrap
          id="bottom"
          spacing={{ base: '4', lg: '8' }}
          mt={{ base: '4', lg: '0' }}
        >
          <WrapItem>
            <Box>&copy; {new Date().getFullYear()} Company</Box>
          </WrapItem>
          {footerLinks.map((link, idx) => (
            <WrapItem key={idx}>
              <Link href={link.href}>{link.label}</Link>
            </WrapItem>
          ))}
        </Wrap>
        <HStack
          spacing="4"
          w={{ base: '100%', lg: 'auto' }}
          justify={{ base: 'space-between', lg: 'flex-start' }}
          mb={{ base: '4', lg: '0' }}
        >
          <LanguageSwitcher />
          <Tooltip hasArrow placement="top" label="Scroll to top">
            <IconButton
              size="sm"
              as="a"
              href="#"
              colorScheme="teal"
              icon={<ArrowUpIcon />}
            >
              Scroll to top
            </IconButton>
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  </Box>
);

const Heart = () => (
  <Box
    display="inline-block"
    mx="1"
    color="tomato"
    fontSize="xs"
    role="img"
    aria-label="Love"
    fontSize="md"
    mb="1"
    as={FaHeart}
  />
);

const Brain = () => (
  <Box
    display="inline-block"
    mx="1"
    color="#ecbcb4"
    fontSize="xs"
    role="img"
    aria-label="Brain"
    fontSize="md"
    mb="1"
    as={FaBrain}
  />
);

const FlagGermany = () => (
  <Box
    display="inline-block"
    mx="1"
    fontSize="xs"
    role="img"
    aria-label="Germany"
  >
    <chakra.svg viewBox="0 0 9 6" h="13px">
      <rect width="9" height="6" fill="#ffce00" />
      <rect width="9" height="4" fill="#dd0000" />
      <rect width="9" height="2" fill="black" />
    </chakra.svg>
  </Box>
);

export default Footer;
