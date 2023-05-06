import { useRef, useEffect, useCallback } from 'react'

function getAfterElement(y: number, otherElements: HTMLDivElement[]) {
    //@ts-ignore
    const state: { offset: number; element: HTMLDivElement | null } = otherElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            console.log(offset)
            if (offset < 0 && offset > closest.offset) {
                console.log('here')
                return { offset: offset, element: child }
            } else {
                return closest
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    )

    return state.element
}

export default function useDraggable(dependencies: any[]) {
    const blocksContainerRef = useRef<HTMLDivElement>(null)
    const blocks = useRef<HTMLDivElement[] | null>(null)
    const draggedBlock = useRef<HTMLDivElement | null>(null)
    const isDragging = useRef<boolean>(false)

    useEffect(() => {
        if (blocksContainerRef.current == null) return
        const container = blocksContainerRef.current

        blocks.current = [...container.querySelectorAll('[data-drag-item]')] as HTMLDivElement[]
        draggedBlock.current = null
    }, [...dependencies])

    const handleDragStart = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            isDragging.current = true
            draggedBlock.current = e.target as HTMLDivElement
            draggedBlock.current.classList.add('use-dragging')
        },
        [...dependencies]
    )

    const handleDragEnd = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            isDragging.current = false
            draggedBlock.current?.classList.remove('use-dragging')
            draggedBlock.current = null
        },
        [...dependencies, draggedBlock.current]
    )

    const handleDragMove = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            if (isDragging.current === false || blocks.current?.length === 0) return

            const otherBlocks = blocks.current?.filter((block) => block !== draggedBlock.current)

            if (draggedBlock.current == null || otherBlocks == null || otherBlocks.length === 0) return

            const afterElement = getAfterElement(e.clientY, otherBlocks)
            if (afterElement) {
                blocksContainerRef.current?.insertBefore(draggedBlock.current, afterElement)
            } else {
                blocksContainerRef.current?.appendChild(draggedBlock.current)
            }
        },
        [...dependencies, isDragging.current, blocks.current, draggedBlock.current]
    )

    const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {}

    return { blocksContainerRef, handleDragStart, handleDragEnd, handleDragMove, handleDragDrop }
}
