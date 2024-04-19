import { Text, Container, Flex, Heading, Link as TextLink, useTheme } from '@chakra-ui/react';
import Link from 'next/link';

const ErrorPage404 = () => {
  const theme = useTheme();

  return (
    <Container as={Flex} flexDirection="column" my="auto" py={20}>
      <Heading as="h1" variant="h2">
        {'notFound.title'}
      </Heading>
      <Text mt={4}>
        <TextLink color={theme.f36.blue500} as={Link} href="/" />
      </Text>
    </Container>
  );
};

export default ErrorPage404;
