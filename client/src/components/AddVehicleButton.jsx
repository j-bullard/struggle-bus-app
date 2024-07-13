import AddVehicleDialog from "@/components/AddVehicleDialog";
import { useState } from "react";

const AddVehicleButton = ({ trimId }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>+</button>
      <AddVehicleDialog
        isOpen={open}
        trimId={trimId}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export { AddVehicleButton };
export default AddVehicleButton;
