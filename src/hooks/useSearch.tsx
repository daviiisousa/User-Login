import { useState, useCallback } from "react";

export function useSearch<T>(
  items: T[],
  searchKey: keyof T
) {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);

      const filtered = items.filter((item) => {
        const itemValue = String(item[searchKey]);
        return itemValue
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      setFilteredItems(filtered);
    },
    [items, searchKey]
  );

  return {
    searchText,
    filteredItems,
    handleSearch,
  };
}