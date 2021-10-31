import * as React from 'react';
import { Badge, LightMode } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const links = [
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '#' },
      { label: 'Why Us', href: '#' },
      {
        label: 'Jobs',
        href: '#',
        badge: (
          <LightMode>
            <Badge colorScheme="blue" fontSize="0.625rem">
              Hiring
            </Badge>
          </LightMode>
        ),
      },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'App',
    links: [
      { label: 'How it works', href: '#' },
      {
        label: 'Pricing',
        href: '#',
        badge: (
          <LightMode>
            <Badge colorScheme="red" fontSize="0.625rem">
              Hot🔥
            </Badge>
          </LightMode>
        ),
      },
      { label: 'Use Cases', href: '#' },
      { label: 'Integrations', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        label: 'Blog',
        href: '#',
        badge: (
          <LightMode>
            <Badge colorScheme="green" fontSize="0.625rem">
              New
            </Badge>
          </LightMode>
        ),
      },
      { label: 'Partnerships', href: '#' },
      { label: 'Case studies', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Login', href: '#' },
      { label: 'Chat with us', href: '#' },
      { label: 'Email us', href: '#' },
      { label: 'Call us', href: '#' },
    ],
  },
];

export const socialLinks = [
  { label: 'Facebook', icon: <FaFacebook />, href: '#' },
  { label: 'Instagram', icon: <FaInstagram />, href: '#' },
  { label: 'LinkedIn', icon: <FaLinkedin />, href: '#' },
  { label: 'LinkedIn', icon: <FaTwitter />, href: '#' },
];

export const footerLinks = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Legal Notice', href: '#' },
  { label: 'Sitemap', href: '#' },
];
