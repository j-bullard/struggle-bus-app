import { usDollar } from "@/utils/currency";
import { useEffect, useState } from "react";
import AddVehicleButton from "@/components/ApprovedVehicleList/AddVehicleButton";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import InfoButton from "@/components/ApprovedVehicleList/InfoButton";

const AVLRoute = () => {
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedMake, setSelectedMake] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [years, _] = useState([2020, 2019, 2018, 2017, 2016, 2015]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const [loading, setLoading] = useState(false);
  const [trims, setTrims] = useState([]);

  useEffect(() => {
    setSelectedMake("");
    setTrims([]);

    const fetchMakes = async () => {
      if (!selectedYear) {
        setMakes([]);
        return;
      }

      const response = await fetch(`/api/makes?year=${selectedYear}`);
      const { data } = await response.json();
      setMakes(data);
    };

    fetchMakes();
  }, [selectedYear]);

  useEffect(() => {
    setSelectedModel("");
    setTrims([]);

    const fetchModels = async () => {
      if (!selectedMake) {
        setModels([]);
        return;
      }

      const response = await fetch(
        `/api/models?verbose=yes&make=${selectedMake}&year=${selectedYear}`,
      );
      const { data } = await response.json();
      setModels(data);
    };

    fetchModels();
  }, [selectedMake]);

  const formDisabled = Boolean(
    !selectedYear || !selectedMake || !selectedModel,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setTrims([]);

    try {
      const response = await fetch(
        `/api/trims?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}&verbose=yes`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trims");
      }
      const { data } = await response.json();
      setTrims(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <Heading as="h2" marginBottom={8}>
          Approved Vehicle List
        </Heading>

        <Card variant="outline">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Stack direction={{ base: "column", lg: "row" }}>
                <FormControl>
                  <FormLabel>Year</FormLabel>
                  <Select
                    name="year"
                    id="year"
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedMake("");
                      setSelectedModel("");
                      setTrims([]);
                      setSelectedYear(e.currentTarget.value);
                    }}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Make</FormLabel>
                  <Select
                    name="makes"
                    id="makes"
                    value={selectedMake}
                    disabled={!Boolean(makes.length)}
                    onChange={(e) => {
                      setSelectedModel("");
                      setTrims([]);
                      setSelectedMake(e.currentTarget.value);
                    }}
                  >
                    <option value="">Select Make</option>
                    {makes.map((make) => (
                      <option key={make.id}>{make.name}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Models</FormLabel>
                  <Select
                    name="models"
                    id="models"
                    value={selectedModel}
                    disabled={!Boolean(models.length)}
                    onChange={(e) => {
                      setTrims([]);
                      setSelectedModel(e.currentTarget.value);
                    }}
                  >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                      <option key={model.id}>{model.name}</option>
                    ))}
                  </Select>
                </FormControl>

                <div style={{ alignSelf: "flex-end" }}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    disabled={formDisabled}
                  >
                    Find
                  </Button>
                </div>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Box>

      {loading && <p>Loading...</p>}

      {trims.length > 0 && (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Year</Th>
                <Th>Make</Th>
                <Th>Model</Th>
                <Th>Trim</Th>
                <Th>Description</Th>
                <Th>MSRP</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trims.map((trim) => (
                <Tr key={trim.id}>
                  <Td>{trim.year}</Td>
                  <Td>{trim.make_model.make.name}</Td>
                  <Td>{trim.make_model.name}</Td>
                  <Td>{trim.name}</Td>
                  <Td>{trim.description}</Td>
                  <Td>{usDollar.format(trim.msrp)}</Td>
                  <Td>
                    <ButtonGroup>
                      <InfoButton trimId={trim.id} />
                      <AddVehicleButton trimId={trim.id} />
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export { AVLRoute };
export default AVLRoute;
