import Avatar from "../../../../shared/Avatar";
import Name from "./name/Name";

const Profile = () => {
  return (
    <div className="relative w-4/5 mx-auto items-center gap-4">
      <Name />
      <Avatar className="justify-center" size={24} />
    </div>
  );
};

export default Profile;
