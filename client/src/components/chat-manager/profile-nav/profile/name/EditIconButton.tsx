import { ReactComponent as EditIcon } from "../../../../../assets/icons/Edit.svg";
import IconButtonWrapper from "../../../../../shared/IconButtonWrapper";

type Props = {
  onClick?: () => void;
};

const EditIconButton = (props: Props) => {
  return (
    <IconButtonWrapper onClick={props.onClick}>
      <EditIcon className="h-6 w-6 text-white" />
    </IconButtonWrapper>
  );
};

export default EditIconButton;
