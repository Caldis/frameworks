/**
 * Wraps matched substrings in a <mark> element.
 * Case-insensitive, supports both EN and CJK text.
 */
export default function Highlight({ text, query }: { text: string; query: string }) {
  if (!query || query.length < 1) return <>{text}</>

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} style={{ background: 'var(--viz-accent)', color: 'var(--text)', borderRadius: 2, padding: '0 1px' }}>{part}</mark>
          : part
      )}
    </>
  )
}
