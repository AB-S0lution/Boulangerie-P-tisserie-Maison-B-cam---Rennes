// « Ma liste »: a per-viewer wish list kept in localStorage. It never sends or places an order.

const KEY = 'bec-liste'

export type ListMap = Record<string, number>

function read(): ListMap {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ListMap) : {}
  } catch {
    return {}
  }
}

function write(m: ListMap): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(m))
  } catch {
    /* storage may be blocked: the page still works for this visit */
  }
  document.dispatchEvent(new CustomEvent('bec:list'))
}

export const getList = (): ListMap => read()
export const listCount = (): number => Object.values(read()).reduce((a, b) => a + b, 0)
export const inList = (slug: string): boolean => (read()[slug] ?? 0) > 0

export function addToList(slug: string): void {
  const m = read()
  m[slug] = (m[slug] ?? 0) + 1
  write(m)
}

export function setQty(slug: string, qty: number): void {
  const m = read()
  if (qty <= 0) delete m[slug]
  else m[slug] = qty
  write(m)
}

export function clearList(): void {
  write({})
}
