import { useRef } from 'react'
import useEventListener from './useEventListener'

export default function useClickOutside(ref: ReturnType<typeof useRef<HTMLDivElement>> | null, cb: any) {
    useEventListener(
        'click',
        (e: Event) => {
            if (ref?.current == null || ref.current.contains(e.target as Node)) return
            cb(e)
        },
        document
    )
}
