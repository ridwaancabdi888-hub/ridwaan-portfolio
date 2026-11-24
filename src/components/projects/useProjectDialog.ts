import { useCallback, useState } from "react";
import type { Project } from "../../data/projects";

/** Shared open/close state for the project details dialog. */
export function useProjectDialog() {
  const [selected, setSelected] = useState<Project | null>(null);
  const open = useCallback((project: Project) => setSelected(project), []);
  const close = useCallback(() => setSelected(null), []);
  return { selected, open, close };
}
