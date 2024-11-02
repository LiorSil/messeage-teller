type ErrorProps = {
  error: string;
};

const ErrorMessage = ({ error }: ErrorProps) => {
  return (
    <p className="bg-app-palette-cool-gray-+90 border-2 border-red-600 text-red-500 text-center">
      {error}
    </p>
  );
};

export default ErrorMessage;
