import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleVehicleDetails = () => {
  const [carDetails, setCarDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/trims/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCarDetails(data);
      });
  }, [id]);

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="DetailsPage">
        <h1>
          {" "}
          {carDetails.year} {carDetails.make_model.make.name}{" "}
          {carDetails.make_model.name}
        </h1>
        <p>
          <strong>{carDetails.description}</strong>
        </p>
        <img src="/images/MAter.jpg" alt="Car Image" />
        <ul className="DetailsList">
          <li>Body Type: {carDetails.make_model_trim_body.type}</li>
          <li>Trim: {carDetails.name}</li>
          <li>Description: {carDetails.description}</li>
          <li>Doors: {carDetails.make_model_trim_body.doors}</li>
          <li>Seats: {carDetails.make_model_trim_body.seats}</li>
          <li>
            Cargo Capacity: {carDetails.make_model_trim_body.cargo_capacity}
          </li>
          <li>
            Max Cargo '('lbs')':{" "}
            {carDetails.make_model_trim_body.max_cargo_capacity}
          </li>
          <li>
            Max Payload '('lbs')': {carDetails.make_model_trim_body.max_payload}
          </li>
          <li>
            Max Towing '('lbs')':{" "}
            {carDetails.make_model_trim_body.max_towing_capacity}
          </li>
          <li>MSRP: {carDetails.msrp}</li>
          <li>
            {" "}
            Combined MPG '('Gasoline')':{" "}
            {carDetails.make_model_trim_mileage.combined_mpg}
          </li>
          <li>
            {" "}
            Combined MPG '('Electric')':{" "}
            {carDetails.make_model_trim_mileage.epa_combined_mpg_electric}
          </li>
          <li>Engine Type: {carDetails.make_model_trim_engine.engine_type}</li>
          <li>Fuel Type: {carDetails.make_model_trim_engine.fuel_type}</li>
          <li>Drive Type: {carDetails.make_model_trim_engine.drive_type}</li>
          <li>
            Transmission: {carDetails.make_model_trim_engine.transmission}
          </li>

          {carDetails.make_model_trim_body.type === "Sedan" && (
            <>
              <li>Change Oil: 8000 miles </li>
              <li>Change Transmission Fluid: 10000 </li>
              <li>Change Brake Fluid: 7000 </li>
              <li>Change Brakepads: 60000 </li>
              <li>Change Tires: 10000</li>
              <li>Tire Rotation: 5000 </li>
              <li>Change Spark Plugs: 50000</li>
            </>
          )}

          {carDetails.make_model_trim_body.type === "SUV" && (
            <>
              <li>Change Oil: 8000 miles </li>
              <li>Change Transmission Fluid: 10000 </li>
              <li>Change Brake Fluid: 7000 </li>
              <li>Change Brakepads: 20000 </li>
              <li>Change Tires: 10000</li>
              <li>Tire Rotation: 5000 </li>
              <li>Change Spark Plugs: 40000</li>
            </>
          )}

          {carDetails.make_model_trim_body.type === "Coupe" && (
            <>
              <li>Change Oil: 8000 miles </li>
              <li>Change Transmission Fluid: 10000 </li>
              <li>Change Brake Fluid: 7000 </li>
              <li>Change Brakepads: 60000 </li>
              <li>Change Tires: 10000</li>
              <li>Tire Rotation: 5000 </li>
              <li>Change Spark Plugs: 40000</li>
            </>
          )}

          {carDetails.make_model_trim_body.type === "Convertible" && (
            <>
              <li>Change Oil: 8000 miles </li>
              <li>Change Transmission Fluid: 10000 </li>
              <li>Change Brake Fluid: 7000 </li>
              <li>Change Brakepads: 60000 </li>
              <li>Change Tires: 10000</li>
              <li>Tire Rotation: 5000 </li>
              <li>Change Spark Plugs: 50000</li>
            </>
          )}

          {carDetails.make_model_trim_body.type === "Hatchback" && (
            <>
              <li>Change Oil: 8000 miles </li>
              <li>Change Transmission Fluid: 10000 </li>
              <li>Change Brake Fluid: 7000 </li>
              <li>Change Brakepads: 60000 </li>
              <li>Change Tires: 10000</li>
              <li>Tire Rotation: 5000 </li>
              <li>Change Spark Plugs: 50000</li>
            </>
          )}

          {carDetails.make_model_trim_body.type
            .toLowerCase()
            .includes("truck") && (
            <>
              <li>Change Oil: 8000 miles </li>
              <li>Change Transmission Fluid: 10000 </li>
              <li>Change Brake Fluid: 7000 </li>
              <li>Change Brakepads: 60000 </li>
              <li>Change Tires: 10000</li>
              <li>Tire Rotation: 5000 </li>
              <li>Change Spark Plugs: 50000</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export { SingleVehicleDetails };
export default SingleVehicleDetails;
