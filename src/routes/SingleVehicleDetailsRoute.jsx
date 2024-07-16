import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  OrderedList,
  UnorderedList,
  List,
  ListItem,
  Stack,
  Image,
} from "@chakra-ui/react";

const SingleVehicleDetailsRoute = () => {
  const [carDetails, setCarDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { vin } = useParams();

  useEffect(() => {
    fetch(`/api/fleet/${vin}`)
      .then((res) => res.json())
      .then((data) => {
        setCarDetails(data);
        setLoading(false);
      });
  }, [vin]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Box className="DetailsPage">
        <Heading textDecorationLine="underline">
          {carDetails.year} {carDetails.make_model.make.name}{" "}
          {carDetails.make_model.name}
        </Heading>
        <Box className="CarDescription" textDecorationLine="underline">
          {" "}
          {carDetails.description}
        </Box>
        <Stack spacing={10} direction="row">
          <Box>
            <Image
              boxSize="400px"
              boxShadow="10px 10px 5px grey"
              objectFit="scale-down"
              border
              src={carDetails.image}
              alt="Car Image"
            />
          </Box>

          <List>
            <Box h="40px" bg="transparent">
              <Heading as="h2" size="2x1">
                Vehicle Details
              </Heading>
              <UnorderedList
                className="DetailsList"
                sx={{
                  marginLeft: "50px",
                }}
              >
                <ListItem>
                  <strong>Body Type:</strong>{" "}
                  {carDetails.make_model_trim_body.type}
                </ListItem>
                <ListItem>
                  <strong>Trim:</strong> {carDetails.name}
                </ListItem>
                <ListItem>
                  <strong>VIN: </strong>
                  {carDetails.vin}
                </ListItem>
                <ListItem>
                  <strong>Doors:</strong>{" "}
                  {carDetails.make_model_trim_body.doors}
                </ListItem>
                <ListItem>
                  <strong>Seats:</strong>{" "}
                  {carDetails.make_model_trim_body.seats}
                </ListItem>
                <ListItem>
                  <strong>Cargo Capacity:</strong>{" "}
                  {carDetails.make_model_trim_body.cargo_capacity}
                </ListItem>
                <ListItem>
                  <strong>Max Cargo (lbs):</strong>{" "}
                  {carDetails.make_model_trim_body.max_cargo_capacity}
                </ListItem>
                <ListItem>
                  <strong>Max Payload (lbs):</strong>{" "}
                  {carDetails.make_model_trim_body.max_payload}
                </ListItem>
                <ListItem>
                  <strong>Max Towing (lbs):</strong>{" "}
                  {carDetails.make_model_trim_body.max_towing_capacity}
                </ListItem>
                <ListItem>
                  <strong>MSRP: </strong>
                  {carDetails.msrp}
                </ListItem>
                <ListItem>
                  {" "}
                  <strong>Combined MPG (Gasoline):</strong>{" "}
                  {carDetails.make_model_trim_mileage.combined_mpg}
                </ListItem>
                <ListItem>
                  {" "}
                  <strong>Combined MPG (Electric):</strong>{" "}
                  {carDetails.make_model_trim_mileage.epa_combined_mpg_electric}
                </ListItem>
                <ListItem>
                  <strong>Engine Type:</strong>{" "}
                  {carDetails.make_model_trim_engine.engine_type}
                </ListItem>
                <ListItem>
                  <strong>Fuel Type:</strong>{" "}
                  {carDetails.make_model_trim_engine.fuel_type}
                </ListItem>
                <ListItem>
                  <strong>Drive Type:</strong>{" "}
                  {carDetails.make_model_trim_engine.drive_type}
                </ListItem>
                <ListItem>
                  <strong>Transmission:</strong>{" "}
                  {carDetails.make_model_trim_engine.transmission}
                </ListItem>
              </UnorderedList>
            </Box>
          </List>
        </Stack>
        <List
          sx={{
            marginTop: "40px",
          }}
        >
          {carDetails.make_model_trim_body.type === "Sedan" && (
            <>
              <Heading as="h2" size="2x1">
                Maintenance Requirements (in miles)
              </Heading>
              <OrderedList>
                <ListItem>Change Oil: 8000 </ListItem>
                <ListItem>Change Transmission Fluid: 10000 </ListItem>
                <ListItem>Change Brake Fluid: 7000 </ListItem>
                <ListItem>Change Brakepads: 60000 </ListItem>
                <ListItem>Change Tires: 10000</ListItem>
                <ListItem>Tire Rotation: 5000 </ListItem>
                <ListItem>Change Spark Plugs: 50000</ListItem>
              </OrderedList>
            </>
          )}

          {carDetails.make_model_trim_body.type === "SUV" && (
            <>
              <Heading as="h2" size="2x1">
                Maintenance Requirements (in miles)
              </Heading>
              <OrderedList>
                <ListItem>Change Oil: 8000 miles </ListItem>
                <ListItem>Change Transmission Fluid: 10000 </ListItem>
                <ListItem>Change Brake Fluid: 7000 </ListItem>
                <ListItem>Change Brakepads: 20000 </ListItem>
                <ListItem>Change Tires: 10000</ListItem>
                <ListItem>Tire Rotation: 5000 </ListItem>
                <ListItem>Change Spark Plugs: 40000</ListItem>
              </OrderedList>
            </>
          )}

          {carDetails.make_model_trim_body.type === "Coupe" && (
            <>
              <Heading as="h2" size="2x1">
                Maintenance Requirements (in miles)
              </Heading>
              <OrderedList>
                <ListItem>Change Oil: 8000 miles </ListItem>
                <ListItem>Change Transmission Fluid: 10000 </ListItem>
                <ListItem>Change Brake Fluid: 7000 </ListItem>
                <ListItem>Change Brakepads: 60000 </ListItem>
                <ListItem>Change Tires: 10000</ListItem>
                <ListItem>Tire Rotation: 5000 </ListItem>
                <ListItem>Change Spark Plugs: 40000</ListItem>
              </OrderedList>
            </>
          )}

          {carDetails.make_model_trim_body.type === "Convertible" && (
            <>
              <Heading as="h2" size="2x1">
                Maintenance Requirements (in miles)
              </Heading>
              <OrderedList>
                <ListItem>Change Oil: 8000 miles </ListItem>
                <ListItem>Change Transmission Fluid: 10000 </ListItem>
                <ListItem>Change Brake Fluid: 7000 </ListItem>
                <ListItem>Change Brakepads: 60000 </ListItem>
                <ListItem>Change Tires: 10000</ListItem>
                <ListItem>Tire Rotation: 5000 </ListItem>
                <ListItem>Change Spark Plugs: 50000</ListItem>
              </OrderedList>
            </>
          )}

          {carDetails.make_model_trim_body.type === "Hatchback" && (
            <>
              <Heading as="h2" size="2x1">
                Maintenance Requirements (in miles)
              </Heading>
              <OrderedList>
                <ListItem>Change Oil: 8000 miles </ListItem>
                <ListItem>Change Transmission Fluid: 10000 </ListItem>
                <ListItem>Change Brake Fluid: 7000 </ListItem>
                <ListItem>Change Brakepads: 60000 </ListItem>
                <ListItem>Change Tires: 10000</ListItem>
                <ListItem>Tire Rotation: 5000 </ListItem>
                <ListItem>Change Spark Plugs: 50000</ListItem>
              </OrderedList>
            </>
          )}

          {carDetails.make_model_trim_body.type
            .toLowerCase()
            .includes("truck") && (
            <>
              <Heading as="h2" size="2x1">
                Maintenance Requirements (in miles)
              </Heading>
              <OrderedList>
                <ListItem>Change Oil: 8000 miles </ListItem>
                <ListItem>Change Transmission Fluid: 10000 </ListItem>
                <ListItem>Change Brake Fluid: 7000 </ListItem>
                <ListItem>Change Brakepads: 60000 </ListItem>
                <ListItem>Change Tires: 10000</ListItem>
                <ListItem>Tire Rotation: 5000 </ListItem>
                <ListItem>Change Spark Plugs: 50000</ListItem>
              </OrderedList>
            </>
          )}
        </List>
      </Box>
    </>
  );
};

export { SingleVehicleDetailsRoute };
export default SingleVehicleDetailsRoute;
