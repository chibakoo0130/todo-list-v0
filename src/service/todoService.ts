import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  where,
} from 'firebase/firestore';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { loggedInUserAtom, todoListAtom } from './atoms';
import { db } from '../config/firebase';

import type { Todo } from '../types';

export const useTodosOfProject = (projectId: string) => {
  const loginUser = useAtomValue(loggedInUserAtom);
  const setTodos = useSetAtom(todoListAtom);

  useEffect(() => {
    const q = query(
      collection(db, 'projects', projectId, 'todos'),
      where('user_id', '==', loginUser?.uid ?? ''),
      orderBy('created_at', 'asc')
    );

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    const unsubscribe = onSnapshot(q, snapshot => {
      const todos = snapshot.docs.map(doc => ({
        id: doc.id,
        user_id: doc.data().user_id,
        project_id: projectId,
        title: doc.data().title,
        status: doc.data().status,
        created_at: doc.data().created_at,
        updated_at: doc.data().updated_at,
      // 完了していないか、3日前以内に更新されたタスクのみ取得
      })).filter(todo => (todo.status == 0 || new Date(todo.updated_at) >= threeDaysAgo));
      setTodos(todos);
    });

    return () => unsubscribe();
  }, [projectId, setTodos, loginUser]);
};

export const addTodo = async (todo: Omit<Todo, 'id'>) => {
  const collectionRef = collection(db, 'projects', todo.project_id, 'todos');
  await addDoc(collectionRef, todo);
};

export const updateTodo = async (todo: Todo) => {
  const docRef = doc(db, 'projects', todo.project_id, 'todos', todo.id);
  await updateDoc(docRef, {
    status: todo.status,
    updated_at: new Date().toISOString(),
  });
};

export const deleteTodo = async (projectId: string, todoId: string) => {
  const docRef = doc(db, 'projects', projectId, 'todos', todoId);
  await deleteDoc(docRef);
};
