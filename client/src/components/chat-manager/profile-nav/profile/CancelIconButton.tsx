import React, { useState, useEffect } from "react";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/Cancel.svg";
import IconButtonWrapper from "../../../../shared/IconButtonWrapper";
import Button from "../../../../shared/Button"; // Import a regular Button component

type CancelIconButtonProps = {
  onClick?: () => void;
};

const CancelIconButton: React.FC<CancelIconButtonProps> = ({ onClick }) => {
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMdScreen ? (
    <IconButtonWrapper onClick={onClick}>
      <CancelIcon className="h-6 w-6 text-white" />
    </IconButtonWrapper>
  ) : (
    <Button type="button" className="text-white w-full bg-red-800 p-2 rounded">
      Cancel
    </Button>
  );
};

export default CancelIconButton;
