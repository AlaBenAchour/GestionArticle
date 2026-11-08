import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import {
  fieldBase,
  fieldNormal,
  fieldError,
  labelClass,
  helpClass,
  errorClass,
} from "../types/fieldStyles";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
};

export default function Dropdown({
  label,
  options,
  placeholder,
  error,
  hint,
  className = "",
  id,
  required,
  ...rest
}: Props) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const messageId = `${selectId}-msg`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={selectId} className={labelClass}>
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error || hint ? messageId : undefined}
          className={`${fieldBase} ${error ? fieldError : fieldNormal} cursor-pointer appearance-none pr-10 ${className}`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Flèche */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

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