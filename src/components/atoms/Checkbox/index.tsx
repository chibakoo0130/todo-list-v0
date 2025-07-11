type Props = {
  checked: boolean;
  onChange?: () => void;
};

/**
 * チェックボックスコンポーネント
 */
export const Checkbox = (props: Props) => {
  const { checked, onChange } = props;

  return (
    <input
      className="m-2"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};
