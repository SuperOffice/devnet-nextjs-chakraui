import { useState, useEffect } from 'react';
import withAuth from '../hocs/withAuth';
import { Flex, Box, VStack, Text } from '@chakra-ui/react';

function Panel() {
  //const [loading, setLoading] = useState(true);

  return <div>Panel</div>;
}

export default withAuth(Panel);
