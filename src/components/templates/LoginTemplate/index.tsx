import { signInWithPopup } from 'firebase/auth';
import { useSetAtom } from 'jotai';

import { auth, provider } from '../../../config/firebase';
import { loggedInUserAtom } from '../../../service/atoms';
import { Button } from '../../atoms/Button';

/**
 * ログインコンポーネント
 */
export const LoginTemplate = () => {
  const setLoginUser = useSetAtom(loggedInUserAtom);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setLoginUser(result.user);
    } catch (e) {
      console.error('Login Error', e);
    }
  };

  return (
    <div>
      <div />
      <Button
        onClick={signIn}
        label="ログイン"
        className="mt-12 mb-4 px-5 bg-blue-500 hover:bg-blue-700 rounded-2xl"
      />
      <p>初めての方もこちらのログインボタンから登録できます。</p>
    </div>
  );
};
