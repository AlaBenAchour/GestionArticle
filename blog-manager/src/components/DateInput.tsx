import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import {
  fieldBase,
  fieldNormal,
  fieldError,
  labelClass,
  helpClass,
  errorClass,
} from "../types/fieldStyles";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function DateInput({
  label,
  error,
  hint,
  className = "",
  id,
  required,
  ...rest
}: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-msg`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type="date"
        required={required}
        aria-invalid={!!error}
        aria-describedby={error || hint ? messageId : undefined}
        className={`${fieldBase} ${error ? fieldError : fieldNormal} ${className}`}
        {...rest}
      />

      {error ? (
        <p id={messageId} className={errorClass} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className={helpClass}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}