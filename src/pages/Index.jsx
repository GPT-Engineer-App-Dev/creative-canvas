import { Box, Container, Flex, Text, VStack, HStack, Spacer, Link, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents } from "../api/supabase";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();

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

      {/* Events Table */}
      <Container maxW="container.lg" py={8}>
        {isLoading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.name}</Td>
                  <Td>{event.date}</Td>
                  <Td>{event.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
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