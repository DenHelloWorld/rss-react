import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../../i18n/navigation';

// TODO: Feature 9 — remove this hook once the search results page is migrated
// to a server component. searchParams will be passed as a prop from page.tsx,
// and navigation will be handled via server actions / HTML forms instead.
type SearchParamsUpdater = (
  updates: Record<string, string>,
  targetPath?: string
) => void;

export const useUpdateSearchParams = (): SearchParamsUpdater => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (updates, targetPath) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${targetPath ?? pathname}?${params.toString()}`);
  };
};
