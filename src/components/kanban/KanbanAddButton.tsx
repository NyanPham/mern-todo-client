import { PlusCircleIcon } from '@heroicons/react/24/outline'

interface KanbanAddButtonProps {
    label: String
    onClick: (e: React.MouseEvent) => void
}

const KanbanAddButton: React.FC<KanbanAddButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className="flex items-center gap-3 py-2 px-3 rounded-lg shadow-sm bg-white text-gray-900 border-none outline-none active-none transition duration-200 hover:shadow-lg hover:-translate-y-0.5"
            type="button"
            onClick={onClick}
        >
            <PlusCircleIcon className="w-7 h-7" />
            <h3 className="">{label}</h3>
        </button>
    )
}

export default KanbanAddButton
