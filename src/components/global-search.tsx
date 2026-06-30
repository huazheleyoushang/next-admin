'use client';

import { useState, useEffect, useMemo, useRef, type RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-config';

/** 快捷键标注 */
const SHORTCUT_MAP: Record<string, string> = {
  '/dashboard': '⌘ D',
  '/dashboard/users': '⌘ U',
  '/dashboard/content': '⌘ C',
  '/dashboard/settings': '⌘ S',
};

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action?: () => void;
}

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function GlobalSearch({ open, onClose, inputRef }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const internalRef = useRef<HTMLInputElement>(null);
  const activeInputRef = inputRef || internalRef;

  // 打开时聚焦
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => activeInputRef.current?.focus(), 50);
    }
  }, [open, activeInputRef]);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // 构建导航结果
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return navItems
      .filter((item) => !q || item.title.toLowerCase().includes(q) || item.url.toLowerCase().includes(q))
      .map((item) => ({
        id: `nav-${item.url}`,
        title: item.title,
        description: `Go to ${item.title}`,
        icon: <item.icon className="h-4 w-4 text-muted-foreground" />,
        shortcut: SHORTCUT_MAP[item.url],
        action: () => {
          router.push(item.url);
          onClose();
        },
      }));
  }, [query, onClose, router]);

  // 键盘导航
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        results[selectedIndex]?.action?.();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, results, selectedIndex]);

  if (!open) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* 搜索面板 - 高度固定 */}
      <div className="fixed left-1/2 top-[20%] z-50 -translate-x-1/2 w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
        <div className="h-[420px] rounded-xl border bg-card/95 shadow-xl flex flex-col">
          {/* 搜索输入 */}
          <div className="flex items-center gap-3 border-b px-4 py-3 shrink-0">
            <Command className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={activeInputRef as RefObject<HTMLInputElement>}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* 分类标签 */}
          <div className="border-b px-4 py-2 shrink-0">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Navigation
            </span>
          </div>

          {/* 结果列表 */}
          <div className="flex-1 overflow-y-auto p-1.5 min-h-0">
            {results.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              results.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => item.action?.()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors',
                    'border-l-2 border-l-transparent',
                    idx === selectedIndex
                      ? 'bg-accent border-l-[var(--primary)]'
                      : 'hover:bg-accent/50'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.icon}
                    <div className="min-w-0">
                      <div className={cn(
                        'text-sm font-medium truncate',
                        idx === selectedIndex && 'text-foreground'
                      )}>
                        {item.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  {item.shortcut && (
                    <span className={cn(
                      'shrink-0 text-[11px] font-medium tabular-nums',
                      idx === selectedIndex
                        ? 'text-foreground/70'
                        : 'text-muted-foreground'
                    )}>
                      {item.shortcut}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
