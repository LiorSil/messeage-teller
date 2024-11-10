import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchContactByPhoneOrName } from "../redux/thunks/subContactThunks";
import { clearQuery, updateQuery } from "../redux/slices/subContactFinderSlice";
import useContact from "./useContact";

const useFindContact = () => {
  const dispatch: AppDispatch = useDispatch();
  const subContacts = useContact().potentialSubContacts;

  const {  query } = useSelector(
    (state: RootState) => state.subContact
  );

  const handleFetchContactByPhoneOrName = useCallback(
    (query: string) => {
      dispatch(fetchContactByPhoneOrName({ query }));
    },
    [dispatch]
  );

  const handleUpdateQuery = useCallback(
    (query: string) => {
      dispatch(updateQuery(query));
    },
    [dispatch]
  );
  const handleClearQuery = useCallback(() => {
    dispatch(clearQuery());
  }, [dispatch]);

  return {
    subContacts,
    handleFetchContactByPhoneOrName,
    handleUpdateQuery,
    handleClearQuery,
    query,
  };
};

export default useFindContact;
