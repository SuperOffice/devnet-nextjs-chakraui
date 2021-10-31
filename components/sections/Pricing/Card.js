import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  BoxProps,
  Button,
  createIcon,
  Flex,
  List,
  ListItem,
  ListItemProps,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

const CheckIcon = createIcon({
  viewBox: '0 0 17 12',
  d:
    'M0 5.82857L1.64571 4.11429L5.48571 7.2L14.8114 0L16.4571 1.71429L5.48571 12L0 5.82857Z',
});

const PricingDetail = (props) => {
  const { children, ...rest } = props;
  return (
    <ListItem
      display="flex"
      alignItems="flex-start"
      fontWeight="medium"
      maxW="260px"
      {...rest}
    >
      <CheckIcon mr="4" mt="1" color="teal" />
      <Text as="span" display="inline-block">
        {children}
      </Text>
    </ListItem>
  );
};

const PopularBadge = (props) => (
  <Box
    whiteSpace="nowrap"
    top="-4"
    left="50%"
    transform="translateX(-50%)"
    pos="absolute"
    rounded="md"
    fontWeight="bold"
    fontSize="sm"
    px="4"
    py="1"
    textTransform="uppercase"
    bg="teal"
    color="white"
    {...props}
  />
);

const PriceDisplay = (props) => {
  const { currency, price } = props;
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      my="5"
      fontWeight="extrabold"
    >
      <Text fontSize="4xl" mr="2">
        {currency}
      </Text>
      <Text fontSize="72px" lineHeight="1" letterSpacing="tight">
        {price}
      </Text>
    </Flex>
  );
};

const PricingWrapper = (props) => {
  const { highlight, ...rest } = props;

  const popularStyles = {
    borderWidth: '2px',
    borderColor: 'teal',
    zIndex: 1,
    px: '8',
    pt: '12',
    pb: '10',
    top: { lg: '-8' },
  };

  const styles = highlight ? popularStyles : null;

  return (
    <Box
      w="full"
      maxW="md"
      mx="auto"
      bg={mode('white', 'gray.700')}
      px="10"
      pt="8"
      pb="8"
      rounded="lg"
      shadow="xl"
      position="relative"
      {...styles}
      {...rest}
    />
  );
};

export const PricingCard = (props) => {
  const {
    onClick,
    href,
    features,
    name,
    description,
    price,
    popular,
    ...rest
  } = props;

  return (
    <PricingWrapper highlight={popular} {...rest}>
      {popular && <PopularBadge>Most Popular</PopularBadge>}

      <Flex direction="column" justify="center">
        <Text align="center" fontSize="2xl" fontWeight="bold">
          {name}
        </Text>
        <Text
          align="center"
          mt="2"
          color={mode('gray.600', 'gray.400')}
          maxW="16rem"
          mx="auto"
        >
          {description}
        </Text>
        <PriceDisplay currency="$" price={price} />
      </Flex>

      <List stylePosition="outside" mt="4" spacing={4} ml="2">
        {features.map((feature, idx) => (
          <PricingDetail key={idx}>{feature}</PricingDetail>
        ))}
      </List>

      <Link href={href || ''}>
        <Button
          minH="3.5rem"
          rounded="lg"
          fontWeight="bold"
          colorScheme={popular ? 'teal' : 'gray'}
          mt="8"
          w="100%"
        >
          Get Started
        </Button>
      </Link>

      <Text
        mt="2"
        color={mode('gray.600', 'gray.400')}
        align="center"
        fontSize="sm"
      >
        No credit card required
      </Text>
    </PricingWrapper>
  );
};
