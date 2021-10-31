import { decrypt } from './crypto';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export default async function refreshAccessToken(token) {
  try {
    const url =
      `https://${process.env.SUPEROFFICE_ENV}.superoffice.com/login/common/oauth/tokens?` +
      new URLSearchParams({
        client_id: process.env.SUPEROFFICE_ID,
        client_secret: process.env.SUPEROFFICE_SECRET,
        grant_type: 'refresh_token',
        refresh_token: decrypt(
          token.refreshToken,
          process.env.ACCESS_TOKEN_IV,
          process.env.ACCESS_TOKEN_SECRET
        ),
      });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: encrypt(
        refreshedTokens.access_token,
        process.env.ACCESS_TOKEN_IV,
        process.env.ACCESS_TOKEN_SECRET
      ),
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token
        ? encrypt(
            refreshedTokens.refresh_token,
            process.env.REFRESH_TOKEN_IV,
            process.env.REFRESH_TOKEN_SECRET
          )
        : token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
