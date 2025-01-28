import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { registerUser } from "../redux/slices/authSlice";

type RegisterFormData = {
  email: string;
  password: string;
  phoneNumber: string;
};

const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>(); // Type the useForm hook with RegisterFormData
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmitHandler: SubmitHandler<RegisterFormData> = (data) => {
    dispatch(registerUser(data));
  };

  return {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    loading,
    error,
    reset,
  };
};

export default useRegisterForm;
