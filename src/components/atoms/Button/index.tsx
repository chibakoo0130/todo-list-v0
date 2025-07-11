import type { MouseEvent } from 'react';

type ButtonProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  className: string;
};

/**
 * ボタンコンポーネント
 */
export const Button = ({ onClick, label, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};
