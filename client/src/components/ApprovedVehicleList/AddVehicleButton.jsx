import AddVehicleDrawer from "@/components/ApprovedVehicleList/AddVehicleDrawer";
import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { RxPlus } from "react-icons/rx";
import Swal from "sweetalert2";

const AddVehicleButton = ({ trimId }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton colorScheme="blue" onClick={() => setOpen(true)} size="sm">
        <RxPlus fontSize={18} />
      </IconButton>

      <AddVehicleDrawer
        open={open}
        trimId={trimId}
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
    </>
  );
};

export { AddVehicleButton };
export default AddVehicleButton;
