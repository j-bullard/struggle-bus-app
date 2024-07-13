import { useEffect, useRef } from "react";

const Dialog = ({ isOpen, children }) => {
  const ref = useRef();

  useEffect(() => {
    if (!isOpen) return;

    const dialog = ref.current;
    dialog.showModal();

    return () => dialog.close();
  }, [isOpen]);

  return <dialog ref={ref}>{children}</dialog>;
};

export { Dialog };
export default Dialog;
