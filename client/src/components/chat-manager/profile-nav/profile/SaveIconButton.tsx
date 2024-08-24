import React, { useEffect, useState } from "react";
import { ReactComponent as SaveIcon } from "../../../../assets/icons/Save.svg";
import IconButtonWrapper from "../../../../shared/IconButtonWrapper";
import Button from "../../../../shared/Button";

type Props = {
  onClick?: () => void;
  isNameValid?: string;
};

const SaveIconButton = (props: Props) => {
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(`props.isNameValid: ${props.isNameValid}`);

  return isMdScreen ? (
    <IconButtonWrapper
      className={`${
        !props.isNameValid
          ? "hover:bg-transparent cursor-not-allowed opacity-50"
          : ""
      }`}
      onClick={props.onClick}
      disabled={!props.isNameValid}
    >
      <SaveIcon className={`h-6 w-6 text-white } `} />
    </IconButtonWrapper>
  ) : (
    <Button
      type="button"
      className={`text-white w-full  p-2 rounded ${
        !props.isNameValid ? " cursor-not-allowed opacity-50" : ""
      }`}
      onClick={props.onClick}
      disabled={!props.isNameValid}
    >
      Save
    </Button>
  );
};

export default SaveIconButton;
