import { useAtomValue } from 'jotai';
import { type MouseEvent, useState } from 'react';

import { loggedInUserAtom } from '../../../service/atoms';
import { addTodo } from '../../../service/todoService';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

type TodoFormProps = {
  projectId: string;
};

/**
 * todoフォームコンポーネント
 */
export const TodoForm = ({ projectId }: TodoFormProps) => {
  const loginUser = useAtomValue(loggedInUserAtom);
  const [value, setValue] = useState('');

  const handleButton = (e: MouseEvent<HTMLButtonElement>, title: string) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo({
      project_id: projectId,
      user_id: loginUser?.uid ?? '',
      title: title,
      status: 0,
      created_at: new Date().toISOString(),
    });
    setValue('');
  };

  return (
    <>
      <div className="flex flex-row space-x-2 items-center m-4">
        <form>
          <Input
            value={value}
            placeholder="やることを入力"
            onChange={e => setValue(e.target.value)}
            className="w-80"
          />
          <Button
            onClick={e => handleButton(e, value)}
            label="追加"
            className="ml-2 px-5 bg-blue-500 hover:bg-blue-700 rounded-2xl text-white font-black"
          />
        </form>
      </div>
    </>
  );
};
