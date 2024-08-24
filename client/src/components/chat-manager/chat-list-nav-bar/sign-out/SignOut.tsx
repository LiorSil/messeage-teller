import React from "react";
import { useSignOut } from "../../../../hooks/useSignOut";
import ConfirmMessage from "../../../../shared/ConfirmMessage";

type Props = {
  onCancel: () => void;
};

const SignOut = (props: Props) => {
  const { handleSignOut } = useSignOut();

  return (
    <>
      <ConfirmMessage
        message={"Are Sure you want to sign out? "}
        confirmMessage={"Sign Out"}
        onConfirm={handleSignOut}
        onCancel={() => props.onCancel()}
      />
    </>
  );
};

export default SignOut;
