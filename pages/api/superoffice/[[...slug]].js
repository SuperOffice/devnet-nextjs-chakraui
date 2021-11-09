import { decrypt } from '../../../utils/crypto';
import refreshAccessToken from '../../../utils/refreshAccessToken';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';

export default async (req, res) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  });

  if (!token) {
    return res.status(401).json({ status: 401, message: 'Unauthorized' });
  }

  if (!token.isAdmin && req.method !== 'get') {
    //allow only admins to POST, DELETE, PUT
    return res.status(403).json({ status: 403, message: 'Forbidden' });
  }

  // get access token, renew if required.

  let accessToken = '';

  if (Date.now() >= token.accessTokenExpires) {
    const refreshToken = await refreshAccessToken(token);

    if (refreshToken.error === 'RefreshAccessTokenError') {
      return res
        .status(500)
        .json({ status: 500, message: 'Internal Server Error' });
    }

    accessToken = decrypt(
      refreshToken.accessToken,
      process.env.ACCESS_TOKEN_IV,
      process.env.ACCESS_TOKEN_SECRET
    );
  }

  const path = req.url.replace('/api/superoffice', '');
  if (!path) {
    return res.status(404).json({ status: 404, message: 'Not Found' });
  }

  // TODO: make sure accessToken isn't empty string...

  await axios({
    method: req.method,
    url: `${token.restUrl}v1${path}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    },
    data: req.body,
  })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      /*console.log('fail');
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        res
          .status(error.response.status)
          .json({ status: error.response.status, data: error.response.data });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //console.log(error.request);
        res
          .status(500)
          .json({ status: error.response.status, data: error.request });
      } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
      }
      console.log(error.config);*/
    });
};
