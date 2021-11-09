import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

const useBrowser = () => {
  if (typeof window === 'undefined') return null;

  let browser;
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browser = 'Opera';
  } else if (userAgent.indexOf('Trident') > -1) {
    browser = 'Internet Explorer';
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Edge';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  } else {
    browser = 'Unknown';
  }

  return browser;
};

const hasCookiesEnabled = async () => {
  if (document.hasStorageAccess && document.requestStorageAccess) {
    return await document
      .hasStorageAccess()
      .then((hasAccess) => hasAccess)
      .catch((_) => false);
  }
  return window.navigator.cookieEnabled;
};

const withAuth = (Component, options) => {
  return (props) => {
    const browser = useBrowser();

    // https://next-auth.js.org/getting-started/upgrade-v4#usesession-hook
    //const [session, loading] = useSession();

    const { data: session, status } = useSession()
    const loading = status === "loading"

    const [checking, setChecking] = useState(true);
    const [hasCookieAccess, setHasCookieAccess] = useState(false);

    //check if we can request storage access else notify the user to allow cookies via settings
    const handleCookieAccess = async () => {
      if (document.requestStorageAccess) {
        await document.requestStorageAccess().then(
          () => {
            //now we have access and reload the page to see if we have a session or have to login
            location.reload();
          },
          () => {
            alert('Cookie access denied. Please allow!');
            //or change state to display something on the page
          }
        );
      } else {
        alert('Please allow cookies in your settings');
        //or change state to display something on the page
      }
    };

    //open new tab for oauth if we have to set cookies in first party context. notify user if we are unable to open new tab
    const handleLogin = () => {
      const newWindow = window.open(
        `${window.location.origin}/login?callbackUrl=${window.location.href}`,
        '_blank'
      );
      try {
        newWindow.focus();
      } catch {
        alert(
          'Pop-up Blocker is enabled! Please add this site to your exception list.'
        );
        //or change state to display something on the page
      }
    };

    //check cookie access on load
    useEffect(() => {
      async function checkCookieAccess() {
        await hasCookiesEnabled().then((enabled) => {
          if (enabled) {
            setHasCookieAccess(true);
          }
        });
        setChecking(false);
      }
      checkCookieAccess();
    }, []);

    //show loading indicator on initialization
    if (typeof window === 'undefined' || loading || checking) {
      return <div>Loading...</div>;
    }

    //if this page was opened by our iframe we have to reload it and close the tab
    if (window.opener) {
      window.opener.location.reload();
      window.close();
      return <div>Loading...</div>;
    }

    //if we have no cookie access let the user do an interaction to allow cookies
    if (!hasCookieAccess) {
      return (
        <button onClick={handleCookieAccess}>
          We need cookies to work! Please click here to allow
        </button>
      );
    }

    //if the user is not logged in check if we are in an iframe or browser dont need first party context then redirect inside the iframe or let the user do an interaction to open oauth in new tab
    if (!session) {
      if (
        window.top === window.self ||
        !['Safari', 'Firefox', 'Edge', 'Unknown'].includes(browser) //In this browsers we have to set cookies in first-party context, therefore we are not able to redirect without user interaction
      ) {
        signIn('superoffice');
        return <div>Loading...</div>;
      } else {
        return <button onClick={handleLogin}>Login</button>;
      }
    }

    //console.log("withAuth session", session);

    //if our component has a custom option admin check if user is admin otherwise render access deny page
    if (options?.admin && !session.user.admin) {
      return <div>Access denied! Only your admin can see this page.</div>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
