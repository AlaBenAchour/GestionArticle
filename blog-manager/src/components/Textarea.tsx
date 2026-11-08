import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import {
  fieldBase,
  fieldNormal,
  fieldError,
  labelClass,
  helpClass,
  errorClass,
} from "../types/fieldStyles";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export default function Textarea({
  label,
  error,
  hint,
  className = "",
  id,
  required,
  rows = 8,
  ...rest
}: Props) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const messageId = `${fieldId}-msg`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={fieldId} className={labelClass}>
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <textarea
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error || hint ? messageId : undefined}
        className={`${fieldBase} ${error ? fieldError : fieldNormal} resize-y ${className}`}
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