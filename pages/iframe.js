import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';

const Iframe = () => {
  const [session, loading] = useSession();

  const [checking, setChecking] = useState(true);
  const [hasCookieAccess, setHasCookieAccess] = useState(false);

  const handleCookieAccess = async () => {
    await document.requestStorageAccess().then(
      () => {
        location.reload();
      },
      () => {
        setHasCookieAccess(false);
        alert('Cookie access denied. Please allow!');
      }
    );
  };

  const handleLogin = () => {
    const newWindow = window.open(
      'https://localhost/login?callbackUrl=https://localhost/iframe',
      '_blank'
    );
    try {
      newWindow.focus();
    } catch {
      alert(
        'Pop-up Blocker is enabled! Please add this site to your exception list.'
      );
    }
  };

  useEffect(() => {
    async function checkCookieAccess() {
      await document
        .hasStorageAccess()
        .then((hasAccess) => {
          console.log('hasAccess: ' + hasAccess);
          if (hasAccess) {
            setHasCookieAccess(true);
          }
        })
        .then(async (_) => {
          console.log('Now we have first-party storage access!');
          console.log(`document.cookie: ${document.cookie}`);
        })
        .catch((_) => {
          console.log('error');
        });
      setChecking(false);
    }
    checkCookieAccess();
  }, []);

  if (typeof window === 'undefined' || loading || checking) {
    return <div>Loading...</div>;
  }

  if (!hasCookieAccess) {
    return (
      <button onClick={handleCookieAccess}>
        Please allow to access cookies
      </button>
    );
  }

  if (!session) {
    if (window.top === window.self) {
      signIn('superoffice');
      return <div>Loading...</div>;
    } else {
      return <button onClick={handleLogin}>Login</button>;
    }
  }

  if (window.opener) {
    window.opener.location.reload();
    window.close();
    return null;
  }

  return <div>Logged in</div>;
};

export default Iframe;
