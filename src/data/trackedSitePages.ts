export type TrackedSitePage = {
  path: string;
  label: string;
};

export function normalizeTrackedPath(path: string) {
  try {
    const { pathname } = new URL(path, 'https://dummy.local');
    return pathname.replace(/\/$/, '') || '/';
  } catch (error) {
    console.warn('[trackedSitePages] Failed to normalize path', error);
    return path === '/' ? '/' : path.replace(/\/$/, '') || '/';
  }
}

export const trackedSitePages: TrackedSitePage[] = [
  { path: '/', label: 'Home' },
  { path: '/sobre/institucional', label: 'Institucional' },
  { path: '/sobre/historia', label: 'História' },
  { path: '/sobre/qualidade', label: 'Qualidade' },
  { path: '/infraestrutura', label: 'Infraestrutura' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/orcamento', label: 'Orçamento' },
  { path: '/contato', label: 'Contato' },
];

export const trackedSitePathSet = new Set(trackedSitePages.map((page) => normalizeTrackedPath(page.path)));

export function getTrackedPageLabel(path: string) {
  const normalizedPath = normalizeTrackedPath(path);
  const found = trackedSitePages.find((page) => normalizeTrackedPath(page.path) === normalizedPath);
  return found?.label ?? normalizedPath;
}
