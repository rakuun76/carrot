interface IFormInput {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  errors: string[];
}

export default function FormInput({
  name,
  type,
  placeholder,
  required = false,
  errors,
}: IFormInput) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md px-2 py-1.5 focus:outline-none ring-1 ring-neutral-400 focus:ring-neutral-100"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, idx) => (
        <span key={idx} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
