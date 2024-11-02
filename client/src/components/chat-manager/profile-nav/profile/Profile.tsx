import useProfile from "../../../../hooks/useProfile";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const {
    isEditMode,
    name,
    isNameValid,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    setName,
  } = useProfile();

  return (
    <main className="relative w-4/5 m-auto my-4">
      <div className="bg-app-palette-sap-green-light-+40 py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-app-palette-cool-gray-+20 focus:ring-app-palette-cool-gray-+20  disabled:opacity-50 disabled:pointer-events-none">
        {!isEditMode ? (
          <ProfileView name={name} onEditClick={handleEditClick} />
        ) : (
          <ProfileEdit
            name={name}
            isNameValid={isNameValid}
            onNameChange={setName}
            onCancelClick={handleCancelClick}
            onSaveClick={handleSaveClick}
          />
        )}
      </div>
    </main>
  );
};

export default Profile;
