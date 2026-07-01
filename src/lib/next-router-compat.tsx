'use client';

import NextLink from 'next/link';
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
} from 'next/navigation';
import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useMemo, useSyncExternalStore } from 'react';

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to?: ComponentProps<typeof NextLink>['href'];
  href?: ComponentProps<typeof NextLink>['href'];
};

export function Link({ to, href, ...props }: LinkProps) {
  return <NextLink href={href ?? to ?? '#'} {...props} />;
}

type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};

const locationChangeEvent = 'next-router-compat-locationchange';

function subscribeToLocationChange(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  window.addEventListener('popstate', onStoreChange);
  window.addEventListener(locationChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener(locationChangeEvent, onStoreChange);
  };
}

function getSearchSnapshot() {
  return typeof window === 'undefined' ? '' : window.location.search;
}

function getServerSearchSnapshot() {
  return '';
}

function useBrowserSearch() {
  return useSyncExternalStore(subscribeToLocationChange, getSearchSnapshot, getServerSearchSnapshot);
}

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (target: string | number, options?: NavigateOptions) => {
      if (typeof target === 'number') {
        if (target < 0) {
          router.back();
        }
        return;
      }

      if (options?.replace) {
        router.replace(target);
      } else {
        router.push(target);
      }
    },
    [router]
  );
}

export function useLocation() {
  const pathname = usePathname();
  const search = useBrowserSearch();

  return useMemo(
    () => ({
      pathname,
      search,
      hash: '',
      state: null,
      key: pathname,
    }),
    [pathname, search]
  );
}

export function useParams<T extends Record<string, string | string[] | undefined> = Record<string, string>>() {
  return useNextParams() as T;
}

export function useSearchParams(): [URLSearchParams, (nextParams: URLSearchParams) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const search = useBrowserSearch();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = useCallback(
    (nextParams: URLSearchParams) => {
      const query = nextParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
      window.dispatchEvent(new Event(locationChangeEvent));
    },
    [pathname, router]
  );

  return [searchParams, setSearchParams];
}

export function Outlet() {
  return null;
}

export type NavLinkProps = Omit<LinkProps, 'className'> & {
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string | undefined);
  children?: ReactNode;
};

export function NavLink({ className, to, href, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const destination = href ?? to ?? '#';
  const destinationPath = typeof destination === 'string' ? destination.split('?')[0] : String(destination);
  const isActive = pathname === destinationPath;
  const resolvedClassName =
    typeof className === 'function' ? className({ isActive, isPending: false }) : className;

  return <Link to={to} href={href} className={resolvedClassName} {...props} />;
}
