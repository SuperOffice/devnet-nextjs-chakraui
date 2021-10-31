import React, { useEffect } from 'react';
import { getSession, signOut } from 'next-auth/client';
import Link from 'next/link';
import { Center, Stack, Heading, Text, Button } from '@chakra-ui/react';

export default function Logout() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);

  return (
    <Center h="90vh">
      <Stack align="center" spacing={8} p={4}>
        <Heading fontSize="150px">👋</Heading>
        <Text>You have been successfully logged out</Text>
        <Stack
          direction={['column', 'row', 'row', 'row']}
          spacing="8"
          align="center"
        >
          <Link href="/login">
            <Button colorScheme="teal">Login again</Button>
          </Link>
          <Text>or</Text>
          <Link href="/">
            <Button variant="outline" colorScheme="teal">
              Go to Homepage
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: '/', permanent: false } };
  }

  return {
    props: { session },
  };
}
