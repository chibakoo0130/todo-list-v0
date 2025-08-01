import { signOut } from 'firebase/auth';
import { useAtom, useSetAtom } from 'jotai';
import { useState } from 'react';

import { auth } from '../../../config/firebase';
import { loggedInUserAtom, removeProjectPopup } from '../../../service/atoms';

/**
 * ヘッダーコンポーネント
 */
export const Header = () => {
  const [loginUser, setLoginUser] = useAtom(loggedInUserAtom);
  const [isMenuShowed, setIsMenuShowed] = useState<boolean>(false);

  const setIsRemoveProjectPopupOpen = useSetAtom(removeProjectPopup);

  const logout = async () => {
    await signOut(auth);
    setLoginUser(null);
  };

  const handleMenuButton = () => {
    setIsMenuShowed(!isMenuShowed);
  };

  const handleRemoveProject = () => {
    setIsRemoveProjectPopupOpen(true);
    setIsMenuShowed(false);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="#" className="flex items-center">
            <span className="self-center py-2 text-xl font-semibold whitespace-nowrap dark:text-white">
              todoリスト
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <p className="mx-4 text-gray-800 dark:text-white" />
            {loginUser ? (
              <a
                onClick={logout}
                className="text-white bg-primary-700 hover:bg-gray-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                ログアウト
              </a>
            ) : (
              <></>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              onClick={handleMenuButton}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/** メニューはログインしていないと表示しない */}
          {loginUser ? (
            <div
              className={`${
                isMenuShowed ? '' : 'hidden'
              } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <p className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white">
                    {/* {loginUser ? loginUser.displayName ?? 'ログインユーザー' : ''} TODO: 個人名を出さずニックネームなどを表示させたい */}
                    {loginUser ? 'ログインユーザー' : ''}
                  </p>
                </li>
                <li>
                  <a
                    onClick={handleRemoveProject}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    リスト削除
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </header>
  );
};
