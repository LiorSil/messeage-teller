import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { fetchContact } from "../redux/thunks/contactThunks";

type LoginFormData = {
  email: string;
  password: string;
};

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginUser(data));
    reset();
  };

  useEffect(() => {

    if (token) {
      dispatch(fetchContact());
      navigate("/chat-room");
    } else {
      navigate("/login");
    }
  }, [token, navigate, cookies, dispatch]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    error,
  };
};

export default useLoginForm;
