import { InputHTMLAttributes } from 'react';

const TextField = ({
  className = '',
  helperText,
  label,
  name,
  placeholder,
  fieldClasses = '',
  ...rest
}: Readonly<
  {
    className?: string;
    helperText?: string;
    label: string;
    name: string;
    placeholder?: string;
    fieldClasses?: string;
  } & InputHTMLAttributes<HTMLInputElement>
>) => {
  return (
    <div className={`text-field-wrapper ${className}`}>
      <label
        htmlFor={name}
        className='label-text'
      >
        {label}
      </label>

      <input
        className={`text-field ${fieldClasses}`}
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
      />

      {helperText && <p className='helper-text'>{helperText}</p>}
    </div>
  );
};

export default TextField;
