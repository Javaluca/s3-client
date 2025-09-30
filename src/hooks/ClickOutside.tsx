import { useEffect, type RefObject } from "react"

export const useClickOutside = (
  ref: RefObject<HTMLElement | undefined | null>,
  callback: () => void,
  addEventListener = true,
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callback()
    }
  }

  useEffect(() => {
    if (addEventListener) {
      document.addEventListener('mouseup', handleClick)
    }

    return () => {
      document.removeEventListener('mouseup', handleClick)
    }
  })
}
