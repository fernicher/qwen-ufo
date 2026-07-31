import { useEffect } from 'react';

const SITE_NAME = 'Project Aurora';

/**
 * Cambia el título de la pestaña del navegador mientras el componente
 * está montado, y lo restaura al desmontar. Sin esto, todas las páginas
 * (y todos los expedientes) comparten el mismo título genérico.
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Archivo Desclasificado UAP`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
