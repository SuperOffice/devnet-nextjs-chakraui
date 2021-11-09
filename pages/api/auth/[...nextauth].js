import NextAuth from 'next-auth';
//import Providers from 'next-auth/providers';
import { encrypt, decrypt } from '../../../utils/crypto';
import refreshAccessToken from '../../../utils/refreshAccessToken';
import axios from 'axios';
import SuperOfficeProvider from '../../../lib/superoffice'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default (req, res) => {
  return NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers
    providers: [
      SuperOfficeProvider({
        clientId: process.env.SUPEROFFICE_ID,
        clientSecret: process.env.SUPEROFFICE_SECRET,
        environment: process.env.SUPEROFFICE_ENV,
      }),
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
      jwt: async ({ token, user, account, profile, isNewUser }) => {     

        if(account) {          
          
          // set encrypted tokens into the token object
          // token will be passed to session callback

          token.accessToken = encrypt(
            account.access_token,
            process.env.ACCESS_TOKEN_IV,
            process.env.ACCESS_TOKEN_SECRET
          );
          token.refreshToken = encrypt(
            account.refresh_token,
            process.env.REFRESH_TOKEN_IV,
            process.env.REFRESH_TOKEN_SECRET
            );
            
          // set token expiration time 
          // TODO: double check this does what it's supposed to do.
          token.accessTokenExpires = Date.now() + account.expires_in * 1000;
        }

        if(profile)
        {
          // normally the profile details would be stored in a DB
          // set desirable profile properties into the token
          // token will be passed to session callback
          token.restUrl           = profile.restUrl        ;
          token.ctx               = profile.customerId     ;
          token.env               = profile.env            ;
          token.isAdmin           = profile.isAdmin        ;
          token.contactId         = profile.contactId      ;
          token.personId          = profile.personId       ;
          token.groupId           = profile.groupId        ;
          token.secondaryGroupIds = profile.secondaryGroups;
          token.roleId            = profile.roleId         ;
          token.initials          = profile.initials       ;
        }
        return token;
      },

      session: async ({ session, token, user }) => {

        if(token) {
          // set desirable profile/token properties 
          // into session (viewable client side)
          session.restUrl       = token.restUrl  ;
          session.ctx           = token.ctx      ;
          session.env           = token.env      ;
          session.user.admin    = token.isAdmin  ;
          session.user.company  = token.contactId;
          session.user.initials = token.initials ;
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
