import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import Loader from '../components/ui/Loader';

const PopUp = () => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (loading || typeof window === 'undefined') return null;
    if (!session) return signIn('superoffice');
    if (window.opener) {
      window.opener.location.reload();
      window.close();
    }
  }, [session, loading]);

  return <Loader />;
};

export default PopUp;
