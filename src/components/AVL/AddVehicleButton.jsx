import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { RxPlus } from "react-icons/rx";
import Swal from "sweetalert2";
import AddVehicleDrawer from "./AddVehicleDrawer";

const AddVehicleButton = ({ trimId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trimData, setTrimData] = useState();

  const handleClick = async (trimId) => {
    setLoading(true);

    const response = await fetch(`/api/trims/${trimId}`);
    const data = await response.json();

    setTrimData(data);
    setOpen(true);
    setLoading(false);
  };

  return (
    <>
      <IconButton
        colorScheme="blue"
        onClick={() => handleClick(trimId)}
        size="sm"
        isLoading={loading}
      >
        <RxPlus fontSize={18} />
      </IconButton>

      {open && (
        <AddVehicleDrawer
          open={open}
          trimData={trimData}
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            Swal.fire({
              title: "Vehicle added",
              icon: "success",
              showConfirmButton: false,
              text: "Vehicle has been added to your fleet",
              timer: 1500,
              timerProgressBar: true,
            });
          }}
        />
      )}
    </>
  );
};

export { AddVehicleButton };
export default AddVehicleButton;
