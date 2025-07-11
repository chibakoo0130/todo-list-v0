import { Button } from '../Button';

import type { Project } from '../../../types';

type ProjectTabsProps = {
  /** プロジェクトリスト */
  projects: Project[];
  /** 現在選択されているプロジェクト */
  currentProject: string;
  /** プロジェクトセットハンドラー */
  setCurrentProject: (id: string) => void;
  /** プロジェクト追加ポップアップ表示set関数 */
  setIsAddProjectPopupOpen: (isOpen: boolean) => void;
};

/**
 * プロジェクトタブコンポーネント
 * - 表示するプロジェクト（todoリスト）切り替えと追加の動線がある
 */
export const ProjectTabs = ({
  projects,
  currentProject,
  setCurrentProject,
  setIsAddProjectPopupOpen,
}: ProjectTabsProps) => {
  const handleTabClick = (id: string) => {
    if (projects.find(project => project.id === id)) {
      setCurrentProject(id);
    }
    return;
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex justify-center-safe whitespace-nowrap space-x-2 text-sm font-medium text-center text-gray-500 pb-[4px]">
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => handleTabClick(project.id)}
            className={`inline-block p-4 rounded-t-lg dark:bg-gray-700  ${
              currentProject === project.id
                ? 'text-blue-500 active'
                : 'hover:dark:bg-gray-500 text-white'
            }`}
          >
            {project.name}
          </button>
        ))}
        <Button
          onClick={() => setIsAddProjectPopupOpen(true)}
          label="新しいリストを追加..."
          className="inline-block p-4 rounded-t-lg dark:bg-gray-500 hover:dark:bg-blue-500 text-white"
        />
      </div>
    </div>
  );
};
