import React, { useState } from 'react'
import { Input } from '../inputs/Input'
import { IKanbanCard } from '../../types'
import Button from '../buttons/Button'

interface KanbanCardProps {}

const KanbanCard: React.FC<KanbanCardProps> = ({}) => {
    const [cardData, setCardData] = useState<IKanbanCard>({
        title: '',
        description: '',
    })

    function handleCardDataChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setCardData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    function handleAddCard() {
        console.log(cardData)
    }

    return (
        <div className="py-4 px-4 flex flex-col gap-4 bg-white rounded-md mt">
            <Input
                id={`kanban-card ${Date.now().toString()}`}
                type="text"
                name="title"
                label="Title"
                value={cardData.title}
                onChange={handleCardDataChange}
            />
            <Input
                id={`kanban-card ${Date.now().toString()}-1`}
                type="textarea"
                name="description"
                label="Description"
                value={cardData.description}
                onChange={handleCardDataChange}
            />
            <Button label="Add" onClick={handleAddCard} />
        </div>
    )
}

export default KanbanCard
