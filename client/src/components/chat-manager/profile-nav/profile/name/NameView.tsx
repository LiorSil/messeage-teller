import React from "react";
import EditIconButton from "./EditIconButton";

type NameViewProps = {
  name: string;
  onEditClick: () => void;
};

const NameView: React.FC<NameViewProps> = ({ name, onEditClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="ml-2 text-xl">{name}</div>
      <EditIconButton onClick={onEditClick} />
    </div>
  );
};

export default NameView;
