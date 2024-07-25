interface IFormBtn {
  disabled?: boolean;
  text: string;
}

export default function FormBtn({ disabled = false, text }: IFormBtn) {
  return (
    <button
      className="primary-btn-layout py-1.5 disabled:bg-neutral-400 disabled:text-neutral-100 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
