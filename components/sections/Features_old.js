import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

const Features = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleSliderChange = (value) => {
    setTabIndex(parseInt(value / 50, 10));
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Flex id="features" direction="column" w="100%" p={4} mb={32}>
      <Slider
        alignSelf="center"
        w="65%"
        mb={16}
        aria-label="slider"
        step={50}
        defaultValue={25}
        value={tabIndex * 50}
        onChange={handleSliderChange}
      >
        <SliderTrack bg="red.100">
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={16}>
          <Text fontSize="40px">🥳</Text>
        </SliderThumb>
      </Slider>
      <Tabs
        variant="unstyled"
        isFitted
        colorScheme="teal"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>{tabIndex === 0 ? '😎' : '🤓'} Feature</Tab>
          <Tab>{tabIndex === 1 ? '😎' : '🤓'} Feature</Tab>
          <Tab>{tabIndex === 2 ? '😎' : '🤓'} Feature</Tab>
        </TabList>
        <TabPanels textAlign="center" fontWeight="bold" mt={16}>
          <TabPanel>
            <p>Click the tabs or pull the slider around</p>
          </TabPanel>
          <TabPanel>
            <p>Yeah yeah. What's up?</p>
          </TabPanel>
          <TabPanel>
            <p>Oh, hello there.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Features;
