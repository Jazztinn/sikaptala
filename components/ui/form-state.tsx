type FormStateProps = {
  error?: string;
  success?: string;
};

export function FormState({ error, success }: FormStateProps) {
  if (!error && !success) {
    return null;
  }

  return (
    <p className={error ? "text-sm text-red-600" : "text-sm text-green-700"}>
      {error || success}
    </p>
  );
}
