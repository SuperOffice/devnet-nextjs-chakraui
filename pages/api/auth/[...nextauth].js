import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { encrypt, decrypt } from '../../../utils/crypto';
import refreshAccessToken from '../../../utils/refreshAccessToken';
import axios from 'axios';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default (req, res) => {
  return NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers
    providers: [
      {
        id: 'superoffice',
        name: 'SuperOffice',
        type: 'oauth',
        version: '2.0',
        scope: 'openid',
        idToken: true,
        params: {
          grant_type: 'authorization_code',
        },
        accessTokenUrl: `https://${process.env.SUPEROFFICE_ENV}.superoffice.com/login/common/oauth/tokens`,
        authorizationUrl: `https://${process.env.SUPEROFFICE_ENV}.superoffice.com/login/common/oauth/authorize?response_type=code`,
        async profile(profile, tokens) {
          return {
            id: profile['http://schemes.superoffice.net/identity/associateid'],
            name: profile['http://schemes.superoffice.net/identity/initials'],
            email: profile['http://schemes.superoffice.net/identity/email'],
          };
        },
        clientId: process.env.SUPEROFFICE_ID,
        clientSecret: process.env.SUPEROFFICE_SECRET,
      },
    ],

    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must to install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    database: null,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.NEXTAUTH_SECRET, //openssl rand -base64 64

    cookies: {
      sessionToken: {
        name: `__Secure-next-auth.session-token`,
        options: {
          path: '/',
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        },
      },
      callbackUrl: {
        name: `__Secure-next-auth.callback-url`,
        options: {
          path: '/',
          sameSite: 'none',
          secure: true,
        },
      },
      csrfToken: {
        name: `__Host-next-auth.csrf-token`,
        options: {
          path: '/',
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        },
      },
    },

    session: {
      jwt: true,
      //maxAge: 30 * 24 * 60 * 60,
    },

    jwt: {
      encryption: true,
      secret: process.env.NEXTAUTH_JWT_SECRET, //openssl rand -base64 64
      signingKey: process.env.NEXTAUTH_JWT_SIGNING_KEY, //npx node-jose-tools newkey -s 256 -t oct -a HS512
      encryptionKey: process.env.NEXTAUTH_JWT_ENCRYPTION_KEY, //npx node-jose-tools newkey -s 256 -t oct -a A256GCM
      //encode: async ({ secret, token, maxAge }) => {},
      //decode: async ({ secret, token, maxAge }) => {},
    },

    pages: {
      signIn: '/login', // Displays signin buttons
      signOut: '/logout', // Displays form with sign out button
      error: '/error', // Error code passed in query string as ?error=
      // verifyRequest: '/api/auth/verify-request', // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },

    callbacks: {
      // async signIn(user, account, profile) { return true },
      // async redirect(url, baseUrl) { return baseUrl },
      jwt: async (token, user, account, profile, isNewUser) => {
        if (account && profile) {
          token.accessToken = encrypt(
            account.accessToken,
            process.env.ACCESS_TOKEN_IV,
            process.env.ACCESS_TOKEN_SECRET
          );
          token.accessTokenExpires = Date.now() + account.expires_in * 1000;
          token.refreshToken = encrypt(
            account.refresh_token,
            process.env.REFRESH_TOKEN_IV,
            process.env.REFRESH_TOKEN_SECRET
          );

          token.env = process.env.SUPEROFFICE_ENV;
          token.ctx = profile['http://schemes.superoffice.net/identity/ctx'];
          token.webApiUrl =
            profile['http://schemes.superoffice.net/identity/webapi_url'];
          token.associateId =
            profile['http://schemes.superoffice.net/identity/associateid'];
          token.admin =
            profile[
              'http://schemes.superoffice.net/identity/is_administrator'
            ] === 'True';
          token.company =
            profile['http://schemes.superoffice.net/identity/company_name'];
          token.initials =
            profile['http://schemes.superoffice.net/identity/initials'];
        }

        // Return previous token if the access token has not expired yet
        if (Date.now() < token.accessTokenExpires) {
          return token;
        }

        // Access token has expired, try to update it
        return refreshAccessToken(token);
      },

      session: async (session, token) => {
        if (token) {
          if (Date.now() >= token.accessTokenExpires) {
            token = refreshAccessToken(token);
          }

          session.error = token.error;
          session.env = token.env;
          session.ctx = token.ctx;
          session.user.admin = token.admin;
          session.user.company = token.company;
          session.user.initials = token.initials;

          await axios
            .get(
              `https://${token.env}.superoffice.com/${token.ctx}/api/v1/User/currentPrincipal`,
              {
                headers: {
                  Authorization: `Bearer ${decrypt(
                    token.accessToken,
                    process.env.ACCESS_TOKEN_IV,
                    process.env.ACCESS_TOKEN_SECRET
                  )}`,
                },
              }
            )
            .then((res) => {
              session.user.fullname = res.data.FullName;
              //add more user data you want to persist in session - https://community.superoffice.com/documentation/sdk/SO.NetServer.Web.Services/html/v1User_GetCurrentPrincipal.htm
            })
            .catch((err) => {
              console.log("Error getting principal.")
              console.log(err);
              session.user.fullname = 'User';
            });
        }

        return session;
      },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === 'development',
  });
};
