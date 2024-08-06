import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { registerUser } from "../redux/slices/registerSlice";

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
  const { loading, error } = useSelector((state: RootState) => state.register);

  const onSubmitHandler: SubmitHandler<RegisterFormData> = (data) => {
    console.log("data", data);
    dispatch(registerUser(data));
    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    loading,
    error,
  };
};

export default useRegisterForm;
