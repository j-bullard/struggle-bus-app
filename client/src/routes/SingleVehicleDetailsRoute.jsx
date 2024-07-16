import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  OrderedList,
  UnorderedList,
  List,
  ListItem,
} from "@chakra-ui/react";

const SingleVehicleDetailsRoute = () => {
  const [carDetails, setCarDetails] = useState();
  const { vin } = useParams();

  useEffect(() => {
    fetch(`/api/fleet/${vin}`)
      .then((res) => res.json())
      .then((data) => {
        setCarDetails(data);
      });
  }, [vin]);

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Box className="DetailsPage">
        <Heading>
          {" "}
          {console.log(carDetails)}
          {carDetails.year} {carDetails.make_model.make.name}{" "}
          {carDetails.make_model.name}
        </Heading>
        <p>
          <strong>{carDetails.description}</strong>
        </p>
        <img src={carDetails.image} alt="Car Image" />
        <List>
          <UnorderedList className="DetailsList">
            <ListItem>
              Body Type: {carDetails.make_model_trim_body.type}
            </ListItem>
            <ListItem>Trim: {carDetails.name}</ListItem>
            <ListItem>VIN: {carDetails.vin}</ListItem>
            <ListItem>Doors: {carDetails.make_model_trim_body.doors}</ListItem>
            <ListItem>Seats: {carDetails.make_model_trim_body.seats}</ListItem>
            <ListItem>
              Cargo Capacity: {carDetails.make_model_trim_body.cargo_capacity}
            </ListItem>
            <ListItem>
              Max Cargo (lbs):{" "}
              {carDetails.make_model_trim_body.max_cargo_capacity}
            </ListItem>
            <ListItem>
              Max Payload (lbs): {carDetails.make_model_trim_body.max_payload}
            </ListItem>
            <ListItem>
              Max Towing (lbs):{" "}
              {carDetails.make_model_trim_body.max_towing_capacity}
            </ListItem>
            <ListItem>MSRP: {carDetails.msrp}</ListItem>
            <ListItem>
              {" "}
              Combined MPG (Gasoline):{" "}
              {carDetails.make_model_trim_mileage.combined_mpg}
            </ListItem>
            <ListItem>
              {" "}
              Combined MPG (Electric):{" "}
              {carDetails.make_model_trim_mileage.epa_combined_mpg_electric}
            </ListItem>
            <ListItem>
              Engine Type: {carDetails.make_model_trim_engine.engine_type}
            </ListItem>
            <ListItem>
              Fuel Type: {carDetails.make_model_trim_engine.fuel_type}
            </ListItem>
            <ListItem>
              Drive Type: {carDetails.make_model_trim_engine.drive_type}
            </ListItem>
            <ListItem>
              Transmission: {carDetails.make_model_trim_engine.transmission}
            </ListItem>
          </UnorderedList>
        </List>
        <List>
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
