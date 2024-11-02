import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchContactByPhoneOrName } from "../redux/thunks/subContactThunks";

const useFindContact = () => {
  const dispatch: AppDispatch = useDispatch();

  const { subContacts, loading, error } = useSelector(
    (state: RootState) => state.subContact,
  );

  const handleFetchContactByPhoneOrName = useCallback(
    (phoneNumber: string) => {
      dispatch(fetchContactByPhoneOrName({ phoneNumber }));
    },
    [dispatch],
  );

  const handleClearAddContactSuccess = useCallback(() => {}, []);

  return {
    subContacts,
    loading,
    error,

    handleFetchContactByPhoneOrName,
    handleClearAddContactSuccess,
  };
};

export default useFindContact;
