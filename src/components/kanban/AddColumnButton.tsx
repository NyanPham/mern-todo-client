import { useState, useRef } from 'react'
import KanbanAddButton from './KanbanAddButton'
import KanbanCard from './KanbanCard'
import useClickOutside from '../../hooks/useClickOutside'

const AddColumnButton = () => {
    const [showAddCard, setShowAddCard] = useState<boolean>(false)
    const addModalRef = useRef<HTMLDivElement>(null)

    //@ts-ignore
    useClickOutside(addModalRef, () => setShowAddCard(false))

    return (
        <div ref={addModalRef} className="flex flex-col gap-4">
            <KanbanAddButton label="Add Column" onClick={() => setShowAddCard((prev) => !prev)} />
            {showAddCard && <KanbanCard />}
        </div>
    )
}

export default AddColumnButton
