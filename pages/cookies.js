import React, { useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import Loader from '../components/ui/Loader';

export default function Cookies({ callbackUrl }) {
  const makeRequestWithUserGesture = () => {
    var promise = document.requestStorageAccess();
    promise.then(
      function () {
        signIn('superoffice', {
          callbackUrl: `${callbackUrl}`,
        });
      },
      function () {
        alert('You have to access to proceed');
      }
    );
  };

  return <button onClick={makeRequestWithUserGesture}>Allow cookies</button>;
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
