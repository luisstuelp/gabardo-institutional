'use client';

import { useId } from 'react';
import PhoneInput from 'react-phone-number-input';
import clsx from 'clsx';

interface InternationalPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  id?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  autoComplete?: string;
}

export default function InternationalPhoneInput({
  value,
  onChange,
  name = 'phone',
  id,
  className,
  inputClassName,
  required,
  placeholder,
  onFocus,
  onBlur,
  disabled,
  autoComplete,
}: InternationalPhoneInputProps) {
  const generatedId = useId();

  return (
    <PhoneInput
      international
      defaultCountry="BR"
      value={value || ''}
      onChange={(phone) => onChange(phone ?? '')}
      name={name}
      id={id ?? generatedId}
      className={clsx('PhoneInput flex w-full items-center gap-3', className)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      smartCaret={false}
      countryCallingCodeEditable={false}
      numberInputProps={{
        className: clsx('PhoneInputInput w-full bg-transparent text-base focus:outline-none placeholder-neutral-400', inputClassName),
        onFocus: () => onFocus?.(),
        onBlur: () => onBlur?.(),
      }}
    />
  );
}
