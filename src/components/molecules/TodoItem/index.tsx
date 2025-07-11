import { Button } from '../../atoms/Button';
import { Checkbox } from '../../atoms/Checkbox';

import type { Todo } from '../../../types';

type TodoItemProps = {
  todo: Todo;
  completeOnChange: (id: string) => void;
  removeOnChange: (id: string) => void;
};

/**
 * todoアイテムコンポーネント
 */
export const TodoItem = ({
  todo,
  completeOnChange,
  removeOnChange,
}: TodoItemProps) => {
  return (
    <>
      <li>
        <label>
          <Checkbox
            checked={todo.status === 2}
            onChange={() => completeOnChange(todo.id)}
          />
          <span
            className="pr-8"
            style={{ textDecoration: todo.status === 2 ? 'line-through' : '' }}
          >
            {todo.title}
          </span>
        </label>
        <Button
          onClick={() => removeOnChange(todo.id)}
          label="削除"
          className="px-5 bg-red-500 hover:bg-red-700 rounded-2xl text-white font-black"
        />
      </li>
    </>
  );
};
