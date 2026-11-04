/**
 * DOM Helper for Opaque-Box E2E and Integration Testing
 * Provides DOM querying, event dispatching, and mock storage
 */

import fs from 'node:fs';
import path from 'node:path';

export interface MockStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  readonly length: number;
}

export function createMockLocalStorage(): MockStorage {
  const store = new Map<string, string>();
  return {
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
    get length() {
      return store.size;
    },
  };
}

/**
 * Loads and parses index.html from workspace root
 */
export function getIndexHtmlContent(): string {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  if (fs.existsSync(htmlPath)) {
    return fs.readFileSync(htmlPath, 'utf8');
  }
  return '';
}

/**
 * Extracts meta tags from HTML string
 */
export function extractMetaTags(html: string): Map<string, string> {
  const metaMap = new Map<string, string>();
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let match: RegExpExecArray | null;

  while ((match = metaRegex.exec(html)) !== null) {
    const attrString = match[1];
    const nameMatch = attrString.match(/(?:name|property)=["']([^"']+)["']/i);
    const contentMatch = attrString.match(/content=["']([^"']+)["']/i);

    if (nameMatch && contentMatch) {
      metaMap.set(nameMatch[1], contentMatch[1]);
    }
  }

  return metaMap;
}

/**
 * Extracts JSON-LD scripts from HTML string
 */
export function extractJsonLdScripts(html: string): any[] {
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const results: any[] = [];
  let match: RegExpExecArray | null;

  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      results.push(parsed);
    } catch {
      // ignore parse errors
    }
  }

  return results;
}
