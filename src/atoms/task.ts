import { atomWithStorage } from "jotai/utils";
import { Task } from "../types";

export const taskAtom = atomWithStorage<Task[]>("tasks", []);
