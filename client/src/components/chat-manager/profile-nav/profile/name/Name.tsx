import React from 'react'
import { useProfile } from '../../../../../hooks/useProfile';
import NameView from './NameView';
import NameEdit from './NameEdit';

const Name = () => {
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
    <div className="bg-app-palette-sap-green-light-+40 py-3 ps-4 pe-9 my-4 block w-full border-gray-200 rounded-lg text-sm focus:border-app-palette-cool-gray-+20 focus:ring-app-palette-cool-gray-+20  disabled:opacity-50 disabled:pointer-events-none">
      {!isEditMode ? (
        <NameView name={name} onEditClick={handleEditClick} />
      ) : (
        <NameEdit
          name={name}
          isNameValid={isNameValid}
          onNameChange={setName}
          onCancelClick={handleCancelClick}
          onSaveClick={handleSaveClick}
        />
      )}
    </div>
  );
}

export default Name