import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { faqs } from './data.js';

const Faq = () => {
  const [index, setIndex] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  return (
    <Flex id="faq" direction="column" w="100%" maxW="670px" h="425px">
      <Box mb="8" align="center">
        <Text
          color={mode('teal.500', 'teal.300')}
          fontWeight="bold"
          maxW="xl"
          mx="auto"
          textAlign={{ sm: 'center' }}
        >
          We're always here to support you
        </Text>
        <Heading
          as="h3"
          size="2xl"
          fontWeight="extrabold"
          textAlign={{ sm: 'center' }}
          mt="4"
        >
          Frequently Asked Questions
        </Heading>
      </Box>
      <Accordion allowToggle index={index}>
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} name={`accordion-button-${idx}`}>
            <AccordionButton
              onClick={() => {
                if (idx === currentId) {
                  setCurrentId(null);
                  setIndex(null);
                } else {
                  setCurrentId(idx);
                  setIndex(idx);
                }
              }}
              bg={mode('white', 'gray.700')}
            >
              <Box flex="1" textAlign="left">
                <Text fontWeight="bold">{faq.question}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export default Faq;
