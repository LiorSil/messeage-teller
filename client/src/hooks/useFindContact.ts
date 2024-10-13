import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchContactByPhoneOrName } from "../redux/thunks/subContactThunks";
import { useMemo, useCallback } from "react";
import Cookies from "universal-cookie";

const useFindContact = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const token = cookies.get("token");

  const dispatch: AppDispatch = useDispatch();

  const { subContacts, loading, error } = useSelector(
    (state: RootState) => state.subContact
  );



  const handleFetchContactByPhoneOrName = useCallback(
    (phoneNumber: string) => {
      dispatch(fetchContactByPhoneOrName({ token, phoneNumber }));
    },
    [dispatch, token]
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
