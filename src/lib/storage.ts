import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const dataDir = path.join(rootDir, 'data');

export function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // Ephemeral or read-only filesystem
    }
  }
}

export function readJsonSafe<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[storage] Warning: failed to read ${filename}, using default value:`, err);
    return defaultValue;
  }
}

export function atomicWriteJson(filename: string, data: unknown): boolean {
  try {
    ensureDataDir();
    const filePath = path.join(dataDir, filename);
    const tempPath = path.join(dataDir, `${filename}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`);
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(tempPath, content, 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.warn(`[storage] Failed atomic write for ${filename} (may be read-only env):`, err);
    return false;
  }
}
