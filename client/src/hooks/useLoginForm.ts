import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { loginUser, clearRedirect } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const dispatch: AppDispatch = useDispatch();
  const { loading, error, redirectTo } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginUser(data));
    reset();
  };

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
      dispatch(clearRedirect()); // Clear the redirect path after navigation
    }
  }, [redirectTo, navigate, dispatch]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    error,
    redirectTo,
  };
};

export default useLoginForm;
