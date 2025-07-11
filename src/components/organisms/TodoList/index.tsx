import { useAtom } from 'jotai';

import { todoListAtom } from '../../../service/atoms';
import { deleteTodo, updateTodo } from '../../../service/todoService';
import { TodoItem } from '../../molecules/TodoItem';

import type { Todo } from '../../../types';

type TodoListProps = {
  projectId: string;
};

/**
 * todoリストコンポーネント
 */
export const TodoList = ({ projectId }: TodoListProps) => {
  const [todoList] = useAtom(todoListAtom);

  const removeTodo = (todoId: string) => {
    deleteTodo(projectId, todoId);
  };

  const completeTodo = (todo: Todo) => {
    todo.status = todo.status != 2 ? 2 : 0;
    updateTodo(todo);
  };

  return (
    <>
      <ul>
        {todoList &&
          todoList.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeOnChange={() => completeTodo(todo)}
              removeOnChange={() => removeTodo(todo.id)}
            />
          ))}
      </ul>
    </>
  );
};
