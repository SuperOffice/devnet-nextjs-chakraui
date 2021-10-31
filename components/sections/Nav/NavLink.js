import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  chakra,
  Flex,
  Text,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react';

const DesktopNavLink = (props) => {
  const { href, children, ...rest } = props;
  return (
    <chakra.a
      fontWeight="semibold"
      color={mode('gray.600', 'gray.300')}
      {...rest}
    >
      <Link href={href || '#'}>{children}</Link>
    </chakra.a>
  );
};

const MobileNavLink = (props) => {
  const { icon, children, href } = props;
  return (
    <Flex
      as="a"
      href={href}
      m="-3"
      p="3"
      align="center"
      rounded="md"
      cursor="pointer"
      _hover={{ bg: mode('gray.50', 'gray.600') }}
    >
      <Icon as={icon} color={mode('teal.600', 'teal.400')} fontSize="xl" />
      <Box marginStart="3" fontWeight="medium">
        {children}
      </Box>
    </Flex>
  );
};

export const NavLink = {
  Desktop: DesktopNavLink,
  Mobile: MobileNavLink,
};
