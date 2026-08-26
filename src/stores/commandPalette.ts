import { atom } from 'nanostores';

export const $isCommandPaletteOpen = atom<boolean>(false);

export const openCommandPalette = () => $isCommandPaletteOpen.set(true);
export const closeCommandPalette = () => $isCommandPaletteOpen.set(false);
export const toggleCommandPalette = () => $isCommandPaletteOpen.set(!$isCommandPaletteOpen.get());
