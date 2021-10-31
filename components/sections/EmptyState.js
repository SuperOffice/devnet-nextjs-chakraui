import Link from 'next/link';
import { Center, Stack, Icon, Heading, Text, Button } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

export default function EmptyState({
  error,
  icon,
  title,
  content,
  ctaLink,
  ctaText,
}) {
  return (
    <Center h="90vh">
      <Stack align="center" spacing={8} p={4}>
        {error && <WarningIcon w="150px" h="150px" color="tomato" />}
        {icon && <Icon as={icon} w="150px" h="150px" color="teal" />}
        <Heading size="2xl">{title}</Heading>
        <Text>{content}</Text>
        <Link href={ctaLink}>
          <Button colorScheme="teal">{ctaText}</Button>
        </Link>
      </Stack>
    </Center>
  );
}
