import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { loginUser } from "../redux/slices/authSlice";

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
  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  const onSubmitHandler: SubmitHandler<LoginFormData> = (data) => {
    dispatch(loginUser(data));
    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    loading,
    error,
    success,
  };
};

export default useLoginForm;
