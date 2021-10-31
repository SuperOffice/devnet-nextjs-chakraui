import { getToken } from 'next-auth/jwt';
import { decrypt } from '../../../utils/crypto';
import refreshAccessToken from '../../../utils/refreshAccessToken';
import axios from 'axios';

export default async (req, res) => {
  const token = await getToken({
    req,
    encryption: true,
    secret: process.env.NEXTAUTH_SECRET,
    signingKey: process.env.NEXTAUTH_JWT_SIGNING_KEY,
    encryptionKey: process.env.NEXTAUTH_JWT_ENCRYPTION_KEY,
  });

  if (!token) {
    return res.status(401).json({ status: 401, message: 'Unauthorized' });
  }

  if (!token.admin && req.method !== 'get') {
    //allow only admins to POST, DELETE, PUT
    return res.status(403).json({ status: 403, message: 'Forbidden' });
  }

  let accessToken = decrypt(
    token.accessToken,
    process.env.ACCESS_TOKEN_IV,
    process.env.ACCESS_TOKEN_SECRET
  );

  if (Date.now() >= token.accessTokenExpires) {
    const refreshToken = await refreshAccessToken(token);

    if (refreshToken.error === 'RefreshAccessTokenError') {
      return res
        .status(500)
        .json({ status: 500, message: 'Internal Server Error' });
    }

    accessToken = refreshToken.accessToken;
  }

  const path = req.url.replace('/api/superoffice', '');
  if (!path) {
    return res.status(404).json({ status: 404, message: 'Not Found' });
  }

  await axios({
    method: req.method,
    url: `https://${token.env}.superoffice.com/${token.ctx}/api/v1${path}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
