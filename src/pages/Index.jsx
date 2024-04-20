import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, CheckboxGroup, Checkbox, Stack, Textarea, useToast, VStack, InputGroup, InputLeftAddon, Heading, Text } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane, FaPrint } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({
    sampleType: "",
    colors: [],
    logo: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    lineSpeed: "",
    printSize: "",
  });
  const [sampleNumber, setSampleNumber] = useState(null);

  const toast = useToast();

  const handleColorChange = (value) => {
    setForm({ ...form, colors: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uniqueNumber = Date.now().toString().slice(-6);
    setSampleNumber(uniqueNumber);

    toast({
      title: "Form submitted.",
      description: "We've received your sample request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handlePrintLabel = () => {
    window.print();
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6}>Sample Request Form</Heading>
      <Box as="form" onSubmit={handleSubmit} border="1px" borderColor="gray.200" p={6} borderRadius="md" boxShadow="sm">
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Type of Sample</FormLabel>
            <Select placeholder="Select sample type" onChange={handleInputChange} name="sampleType">
              <option value="CO2">Laser - CO2</option>
              <option value="fiber">Laser - Fiber</option>
              <option value="UV">Laser - UV</option>
              <option value="TIJ">Ink - TIJ</option>
              <option value="CIJ">Ink - CIJ</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Color Selection</FormLabel>
            <CheckboxGroup onChange={handleColorChange}>
              <Stack direction="row">
                <Checkbox value="red">Red</Checkbox>
                <Checkbox value="yellow">Yellow</Checkbox>
                <Checkbox value="blue">Blue</Checkbox>
                <Checkbox value="white">White</Checkbox>
                <Checkbox value="UV">UV</Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Upload Logo/Design</FormLabel>
            <InputGroup>
              <InputLeftAddon>
                <FaUpload />
              </InputLeftAddon>
              <Input type="file" p={1} onChange={handleFileChange} accept="image/*" />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Your full name" name="name" onChange={handleInputChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Your email address" type="email" name="email" onChange={handleInputChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder="Your phone number" type="tel" name="phone" onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input placeholder="Your company name" name="companyName" onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Line Speed (if applicable)</FormLabel>
            <Input placeholder="Line speed in m/min" type="number" name="lineSpeed" onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Sample Print Size (if applicable)</FormLabel>
            <Textarea placeholder="Describe the desired print size" name="printSize" onChange={handleInputChange} />
          </FormControl>
          <Button leftIcon={<FaPaperPlane />} colorScheme="blue" type="submit">
            Submit Request
          </Button>
        </VStack>
      </Box>
      {sampleNumber && (
        <Box mt={8} p={6} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
          <Heading size="md" mb={4}>
            Shipping Label
          </Heading>
          <Text>
            Cyklop CSC Att.: SampleLab M.Slot {sampleNumber}
            <br />
            Wilhelm Röntgenstraat 10
            <br />
            8013NC
            <br />
            Zwolle
            <br />
            Nederland
          </Text>
          <Button leftIcon={<FaPrint />} colorScheme="blue" mt={4} onClick={handlePrintLabel}>
            Print Label
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Index;
