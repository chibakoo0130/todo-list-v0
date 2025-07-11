import { atom } from 'jotai';

import { type Project, type Todo } from '../types';

import type { User } from 'firebase/auth';

export const loggedInUserAtom = atom<User | null>(null);
export const todoListAtom = atom<Todo[]>([]);
export const projectListAtom = atom<Project[]>([]);
export const removeProjectPopup = atom<boolean>(false);
