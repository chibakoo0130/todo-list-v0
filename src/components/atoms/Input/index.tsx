import type { ChangeEventHandler } from 'react';

type InputProps = {
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className: string;
};

/**
 * テキスト入力コンポーネント
 */
export const Input = ({
  value,
  placeholder,
  onChange,
  className,
}: InputProps) => {
  return (
    <input
      type='text'
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
};
