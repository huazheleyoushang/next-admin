import { useEffect, useRef } from 'react';

interface UseHotkeyOptions {
  /** 快捷键组合，默认 'meta+k,ctrl+k' */
  keys?: string;
  /** 是否启用 */
  enabled?: boolean;
  /** 按键按下时的回调 */
  onHotkey?: () => void;
  /** 阻止默认行为 */
  preventDefault?: boolean;
}

/**
 * 全局快捷键 Hook
 * 监听 Meta+K / Ctrl+K 触发回调
 */
export function useHotkey({
  keys = 'meta+k,ctrl+k',
  enabled = true,
  onHotkey,
  preventDefault = true,
}: UseHotkeyOptions = {}) {
  const onHotkeyRef = useRef(onHotkey);
  onHotkeyRef.current = onHotkey;

  useEffect(() => {
    if (!enabled) return;

    const parsedKeys = keys.split(',').map((k) => k.trim());

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      const isK = e.key === 'k' || e.key === 'K';

      if (isMeta && isK) {
        if (preventDefault) {
          e.preventDefault();
        }
        onHotkeyRef.current?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keys, enabled, preventDefault]);
}
