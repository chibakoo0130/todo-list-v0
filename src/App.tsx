import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { Header } from './components/organisms/Header';
import { LoginTemplate } from './components/templates/LoginTemplate';
import { TodoListTemplate } from './components/templates/TodoListTemplate';
import { auth } from './config/firebase';
import { loggedInUserAtom } from './service/atoms';

const App = () => {
  const [loginUser, setLoginUser] = useAtom(loggedInUserAtom);

  useEffect(() => {
    // 初期状態の検出
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setLoginUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [setLoginUser]);

  return (
    <>
      <Header />
      {loginUser ? <TodoListTemplate /> : <LoginTemplate />}
    </>
  );
};

export default App;
