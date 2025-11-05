import { useCallback, useState } from 'react';

interface UseDropdownReturn {
  openDropdownId: string | null;
  toggleDropdown: (id: string) => void;
  closeDropdown: () => void;
  isOpen: (id: string) => boolean;
}

export const useDropdown = (): UseDropdownReturn => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdownId(null);
  }, []);

  const isOpen = useCallback(
    (id: string) => {
      return openDropdownId === id;
    },
    [openDropdownId]
  );

  return {
    openDropdownId,
    toggleDropdown,
    closeDropdown,
    isOpen,
  };
};
