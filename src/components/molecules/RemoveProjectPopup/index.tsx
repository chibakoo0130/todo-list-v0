import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { projectListAtom } from '../../../service/atoms';
import { deleteProject } from '../../../service/projectService';
import { Button } from '../../atoms/Button';

type RemoveProjectPopupProps = {
  /** ポップアップ表示状態 */
  isOpen: boolean;
  /** プロジェクト追加ポップアップ表示set関数 */
  setIsOpen: (isOpen: boolean) => void;
};

/**
 * プロジェクト削除ポップアップコンポーネント
 */
export const RemoveProjectPopup = ({
  isOpen,
  setIsOpen,
}: RemoveProjectPopupProps) => {
  const projects = useAtomValue(projectListAtom);
  const [value, setValue] = useState<string>('');

  const handleRemove = () => {
    deleteProject(value);
    setIsOpen(false);
  };

  // ポップアップ外部クリック時は閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest('.removePorjectPopup')) {
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

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="removePorjectPopup p-4 bg-gray-900 rounded-2xl shadow-md">
        <p className="text-lg mb-4">
          削除したいリストを選択し、削除ボタンを押してください。
        </p>
        <div className="flex flex-col justify-start">
          {projects.map(project => (
            <>
              <div className="w-full pl-4">
                <input
                  key={project.id}
                  id={project.id}
                  type="radio"
                  value={project.id}
                  name="removeProject"
                  onChange={e => setValue(e.target.value)}
                  className="my-2 mr-1"
                />
                <label htmlFor={project.id}>{project.name}</label>
              </div>
            </>
          ))}
        </div>
        <div className="flex gap-4 justify-end mt-4">
          <Button
            onClick={() => handleCancel()}
            label="キャンセル"
            className="px-5 bg-gray-500 hover:bg-gray-700 rounded-2xl"
          />
          <Button
            onClick={() => handleRemove()}
            label="削除"
            className="px-5 bg-red-500 hover:bg-red-700 text-white rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
