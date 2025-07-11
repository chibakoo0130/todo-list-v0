import { useAtomValue } from 'jotai';
import { type MouseEvent, useEffect, useState } from 'react';

import { loggedInUserAtom } from '../../../service/atoms';
import { addProject } from '../../../service/projectService';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

type AddProjectPopupProps = {
  /** ポップアップ表示状態 */
  isOpen: boolean;
  /** プロジェクト追加ポップアップ表示set関数 */
  setIsOpen: (isOpen: boolean) => void;
};

/**
 * プロジェクト追加ポップアップコンポーネント
 */
export const AddProjectPopup = ({
  isOpen,
  setIsOpen,
}: AddProjectPopupProps) => {
  const loginUser = useAtomValue(loggedInUserAtom);
  const [value, setValue] = useState('');

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleAddButton = (e: MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    if (!value.trim()) return;
    addProject({
      user_id: loginUser?.uid ?? '',
      name: name,
      created_at: new Date().toISOString(),
    });
    setValue('');
    setIsOpen(false);
  };

  // ポップアップ外部クリック時は閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest('.addPorjectPopup')) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="addPorjectPopup p-4 bg-gray-900 rounded-2xl shadow-md">
        <p className="text-lg mb-4">追加したいtodoリストを入力してください。</p>
        <Input
          value={value}
          placeholder="リストを入力"
          onChange={e => setValue(e.target.value)}
          className="m-2 w-full"
        />
        <div className="flex gap-4 justify-end mt-4">
          <Button
            onClick={handleCancel}
            label="キャンセル"
            className="px-5 bg-gray-500 hover:bg-gray-700 rounded-2xl"
          />
          <Button
            onClick={e => handleAddButton(e, value)}
            label="追加"
            className="px-5 bg-blue-500 hover:bg-blue-700 text-white rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
