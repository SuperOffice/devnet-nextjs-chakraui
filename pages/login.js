import React, { useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import Loader from '../components/ui/Loader';

export default function Login({ callbackUrl }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    signIn('superoffice', {
      callbackUrl,
    });
  }, []);

  return <Loader />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return { redirect: { destination: '/admin', permanent: false } };
  }

  const { callbackUrl } = context.query;

  return {
    props: {
      session,
      callbackUrl: callbackUrl || `${process.env.NEXT_PUBLIC_URL}/admin`,
    },
  };
}
