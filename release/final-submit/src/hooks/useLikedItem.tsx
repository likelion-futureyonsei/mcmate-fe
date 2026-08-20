import {useEffect, useState} from "react";

const getStorageKey = (id: string) => `mcmate-liked-${id}`;

export const LIKED_ITEM_STORAGE_PREFIX = "mcmate-liked-";

export const clearLikedItems = () => {
  Object.keys(window.localStorage)
    .filter((key) => key.startsWith(LIKED_ITEM_STORAGE_PREFIX))
    .forEach((key) => window.localStorage.removeItem(key));
};

export const useLikedItem = (id: string, initialValue = false) => {
  const storageKey = getStorageKey(id);
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    const savedValue = window.localStorage.getItem(storageKey);
    return savedValue === null ? initialValue : savedValue === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, String(isLiked));
  }, [isLiked, storageKey]);

  const toggleLiked = () => setIsLiked((value) => !value);

  return {isLiked, toggleLiked};
};
