import { Box, BoxProps, Flex } from '@chakra-ui/react';
import Link from 'next/link';

import MobileLogo from '@icons/bonelli-mobile.svg';
import DesktopLogo from '@icons/bonelli.svg';

export const HEADER_HEIGHT = 60;

export const Header = (props: BoxProps) => {
  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      align="center"
      pl={{ base: 4, md: 12, lg: 12 }}
      pr={{ base: 4, md: 12, lg: 12 }}
      height={`${HEADER_HEIGHT}px`}
      zIndex="2"
      {...props}>
      <Link href="/" title={'common.homepage'}>
        <Box
          display={{ base: 'none', md: 'block', lg: 'block' }}
          as={DesktopLogo}
          title={'common.logoImageAltText'}
        />
        <Box
          display={{ base: 'block', md: 'none', lg: 'none' }}
          as={MobileLogo}
          title={'common.logoImageAltText'}
        />
      </Link>
    </Flex>
  );
};
