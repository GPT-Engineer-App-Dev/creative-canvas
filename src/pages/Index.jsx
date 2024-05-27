import { Box, Container, Flex, Text, VStack, HStack, Spacer, Link } from "@chakra-ui/react";

const Index = () => {
  return (
    <Box>
      {/* Navigation Bar */}
      <Box as="nav" bg="brand.800" color="white" py={4} px={8}>
        <Flex maxW="container.lg" mx="auto" align="center">
          <Text fontSize="xl" fontWeight="bold">MyWebsite</Text>
          <Spacer />
          <HStack spacing={8}>
            <Link href="#home" _hover={{ textDecoration: "none", color: "brand.700" }}>Home</Link>
            <Link href="#about" _hover={{ textDecoration: "none", color: "brand.700" }}>About</Link>
            <Link href="#contact" _hover={{ textDecoration: "none", color: "brand.700" }}>Contact</Link>
          </HStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container id="home" centerContent maxW="container.md" py={16}>
        <VStack spacing={4}>
          <Text fontSize="4xl" fontWeight="bold">Welcome to MyWebsite</Text>
          <Text fontSize="lg" textAlign="center">This is a placeholder for the main content. Use this space to introduce your website and engage your visitors.</Text>
        </VStack>
      </Container>

      {/* Footer */}
      <Box as="footer" bg="brand.800" color="white" py={4} px={8} mt={16}>
        <Flex maxW="container.lg" mx="auto" align="center" justify="center">
          <Text fontSize="sm">&copy; 2023 MyWebsite. All rights reserved.</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;