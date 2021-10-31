import * as React from 'react';
import {
  chakra,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const LanguageSwitcher = () => (
  <Menu>
    <MenuButton
      as={Button}
      rightIcon={<ChevronDownIcon />}
      colorScheme="teal"
      size="sm"
    >
      Language
    </MenuButton>
    <MenuList color="black" bg="white">
      <MenuItem>
        <HStack spacing="4">
          <span>🇩🇪</span>
          <span>Deutsch</span>
        </HStack>
      </MenuItem>
      <MenuItem>
        <HStack spacing="4">
          <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
          <span>English</span>
        </HStack>
      </MenuItem>
      <MenuItem>
        <HStack spacing="4">
          <span>🇳🇱</span>
          <span>Nederlands</span>
        </HStack>
      </MenuItem>
      <MenuItem>
        <HStack spacing="4">
          <span>🇳🇴</span>
          <span>Norsk</span>
        </HStack>
      </MenuItem>
      <MenuItem>
        <HStack spacing="4">
          <span>🇸🇪</span>
          <span>Svenska</span>
        </HStack>
      </MenuItem>
    </MenuList>
  </Menu>
);
