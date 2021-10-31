import React from 'react';
import { Flex } from '@chakra-ui/react';
import Nav from '../sections/Nav';
import Footer from '../sections/Footer';

export default function LayoutLanding(props) {
  return (
    <Flex direction="column" align="center" m="0 auto" {...props}>
      <Nav />
      {props.children}
      <Footer />
    </Flex>
  );
}
