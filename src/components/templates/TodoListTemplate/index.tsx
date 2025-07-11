import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';

import {
  loggedInUserAtom,
  projectListAtom,
  removeProjectPopup,
} from '../../../service/atoms';
import { useProjects } from '../../../service/projectService';
import { useTodosOfProject } from '../../../service/todoService';
import { ProjectTabs } from '../../atoms/ProjectTabs';
import { AddProjectPopup } from '../../molecules/AddProjectPopup';
import { RemoveProjectPopup } from '../../molecules/RemoveProjectPopup';
import { TodoForm } from '../../molecules/TodoForm';
import { TodoList } from '../../organisms/TodoList';

/**
 * todoリストテンプレート
 */
export const TodoListTemplate = () => {
  const loginUser = useAtomValue(loggedInUserAtom);
  const projects = useAtomValue(projectListAtom);

  const [currentProject, setCurrentProject] = useState<string>(
    projects[0]?.id ?? ''
  );
  const [isAddProjectPopupOpen, setIsAddProjectPopupOpen] =
    useState<boolean>(false);
  const [isRemoveProjectPopupOpen, setIsRemoveProjectPopupOpen] =
    useAtom(removeProjectPopup);

  useProjects(loginUser?.uid ?? '');
  useTodosOfProject(currentProject ? currentProject : 'default');

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="max-w-2xl my-6 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          todoリスト
        </h1>
        <ProjectTabs
          projects={projects ?? []}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          setIsAddProjectPopupOpen={setIsAddProjectPopupOpen}
        />
        <TodoForm projectId={currentProject} />
        <TodoList projectId={currentProject} />
        {isAddProjectPopupOpen && (
          <AddProjectPopup
            isOpen={isAddProjectPopupOpen}
            setIsOpen={setIsAddProjectPopupOpen}
          />
        )}
        {isRemoveProjectPopupOpen && (
          <RemoveProjectPopup
            isOpen={isRemoveProjectPopupOpen}
            setIsOpen={setIsRemoveProjectPopupOpen}
          />
        )}
      </div>
    </>
  );
};
