"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

/**
 * Le thème vit en dehors de React (attribut `data-theme` sur <html>,
 * posé par le script anti-flash de layout.tsx et par ce composant). On
 * utilise `useSyncExternalStore` — le mécanisme prévu par React pour lire
 * un état externe de ce type — plutôt qu'un `useState` + `useEffect`, qui
 * provoquerait un rendu "mounted" intermédiaire inutile et un avertissement
 * de lint (setState synchrone dans un effet).
 */
function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

function getSnapshot(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// Pendant le rendu serveur, il n'y a pas de <html data-theme> : on retombe
// sur "light" (React réconcilie automatiquement avec la vraie valeur côté
// client sans avertissement d'hydratation, c'est le rôle de ce 3ᵉ argument).
function getServerSnapshot(): "light" | "dark" {
  return "light";
}

/**
 * Bouton de bascule clair/sombre. Le choix est mémorisé en localStorage et
 * s'applique en posant `data-theme` sur `<html>` (voir la cascade définie
 * dans globals.css).
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
    // Prévient useSyncExternalStore que la valeur externe a changé, pour
    // qu'il relise `getSnapshot` et re-rende avec la nouvelle valeur.
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"
      }
      className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      {theme === "dark" ? (
        // Icône soleil (affichée en thème sombre : cliquer bascule vers le clair).
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Icône lune (affichée en thème clair : cliquer bascule vers le sombre).
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
