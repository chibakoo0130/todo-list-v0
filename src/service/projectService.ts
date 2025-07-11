import { query, collection, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { projectListAtom } from './atoms';
import { db } from '../config/firebase';

import type { Project } from '../types';

export const useProjects = (userId: string) => {
  const [projects, setProjects] = useAtom(projectListAtom);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(
        collection(db, 'projects'),
        where('user_id', '==', userId)
      );
      const projectsSnapshot = await getDocs(q);
      const projects: Project[] = projectsSnapshot.docs.map(doc => {
        return {
          id: doc.id,
          user_id: doc.data().user_id,
          name: doc.data().name,
          created_at: doc.data().created_at,
          updated_at: doc.data().updated_at,
        };
      });
      setProjects(projects);
    };
    fetchProjects();
  }, [userId, setProjects]);
  return projects;
};

export const addProject = async (project: Omit<Project, 'id'>) => {
  const collectionRef = collection(db, 'projects');
  await addDoc(collectionRef, project);
};

export const deleteProject = async (projectId: string) => {
  const docRef = doc(db, 'projects', projectId);
  await deleteDoc(docRef);
}
