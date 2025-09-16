import { useRef, useState } from 'react'
import { DEFAULT_ITEMS, DEFAULT_OPTIONS } from './config'
import { useLocalStorage } from './hooks/useLocalStorage'
import { FoodWheel, FoodWheelHandle } from './components/FoodWheel'
import './index.css'

export default function App() {
  const wheelRef = useRef<FoodWheelHandle>(null)
  const [items, setItems] = useLocalStorage<string[]>('fw.items', DEFAULT_ITEMS, true)
  const [options, setOptions] = useLocalStorage('fw.options', DEFAULT_OPTIONS, true)
  const [input, setInput] = useState('')
  const [history, setHistory] = useLocalStorage<string[]>('fw.history', [])
  const [last, setLast] = useLocalStorage<string | null>('fw.last', null)

  function addItem() {
    const v = input.trim()
    if (!v) return
    setItems([...items, v])
    setInput('')
  }

  function removeAt(i: number) {
    setItems(items.filter((_, idx) => idx !== i))
  }

  function spin() {
    wheelRef.current?.spin()
  }

  function onSelect(item: string) {
    setLast(item)
    setHistory([item, ...history].slice(0, 12))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-amber-100 to-rose-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">🎡 食物轉盤 Food Wheel</h1>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="size-4 accent-pink-500"
                checked={options.showLabels}
                onChange={e => setOptions({ ...options, showLabels: e.target.checked })}
              />
              顯示標籤
            </label>
            <button
              onClick={spin}
              className="btn bg-pink-500 text-white"
            >
              🎲 開始轉！
            </button>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-6">
          <section className="card">
            <FoodWheel
              ref={wheelRef}
              items={items.length ? items : ['加點選項吧！']}
              showLabels={options.showLabels}
              onSelect={(item) => onSelect(item)}
            />
            {last && (
              <p className="text-center mt-4 text-lg font-bold">今天就吃：<span className="text-pink-600">{last}</span> 🎉</p>
            )}
          </section>

          <section className="card">
            <h2 className="font-bold mb-3">🍱 選項管理</h2>
            <div className="flex gap-2 mb-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="例如：牛肉麵、便當、鹽酥雞…"
                className="w-full rounded-xl border border-black/10 px-3 py-2 bg-white/80 dark:bg-slate-800/80"
                onKeyDown={e => { if (e.key === 'Enter') addItem() }}
              />
              <button onClick={addItem} className="btn bg-emerald-500 text-white">新增</button>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {items.map((it, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2 bg-white/70 dark:bg-slate-800/70">
                  <span className="truncate">{it}</span>
                  <button
                    onClick={() => removeAt(i)}
                    className="text-rose-600 hover:text-rose-700 text-sm"
                    title="刪除"
                  >✕</button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setItems(DEFAULT_ITEMS)}
                className="btn bg-slate-200 dark:bg-slate-700"
              >重置為預設</button>
              <button
                onClick={() => { setItems([]) }}
                className="btn bg-slate-200 dark:bg-slate-700"
              >清空</button>
            </div>

            <h2 className="font-bold mt-6 mb-2">🕘 歷史紀錄</h2>
            {history.length === 0 && <p className="text-sm opacity-70">— 暫無紀錄 —</p>}
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <span key={i} className="rounded-full border border-black/10 px-3 py-1 text-sm bg-white/80 dark:bg-slate-800/80">{h}</span>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-8 text-center opacity-70 text-sm">
          Built with React · Tailwind · Vite · GitHub Pages
        </footer>
      </div>
    </div>
  )
}