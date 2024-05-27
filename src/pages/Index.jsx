import { Box, Container, Flex, Text, VStack, HStack, Spacer, Link, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useEvents, useAddEvent, useDeleteEvent } from "../api/supabase";
import { useState } from "react";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEventMutation = useAddEvent();
  const deleteEventMutation = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '' });

  const handleAddEvent = () => {
    addEventMutation.mutate(newEvent, {
      onSuccess: () => {
        setNewEvent({ name: '', date: '', description: '' });
      },
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEventMutation.mutate(id);
  };

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

      {/* Add Event Form */}
      <Container maxW="container.md" py={8}>
        <VStack spacing={4} as="form" onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          </FormControl>
          <FormControl id="date">
            <FormLabel>Date</FormLabel>
            <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input type="text" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          </FormControl>
          <Button type="submit" colorScheme="blue" isLoading={addEventMutation.isLoading}>Add Event</Button>
          {addEventMutation.error && (
            <Alert status="error">
              <AlertIcon />
              {addEventMutation.error.message}
            </Alert>
          )}
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
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.name}</Td>
                  <Td>{event.date}</Td>
                  <Td>{event.description}</Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteEvent(event.id)} isLoading={deleteEventMutation.isLoading}>Delete</Button>
                  </Td>
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