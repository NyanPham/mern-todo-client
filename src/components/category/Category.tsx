interface CategoryProps {
    title: string
    id: string
    isSelected: boolean
    onClick: (categoryId: string) => void
}

const Category: React.FC<CategoryProps> = ({ title, id, isSelected, onClick }) => {
    return (
        <div
            className={`px-4 py-2 cursor-pointer hover:opacity-70 transition duration-250 w-full truncate text-gray-900 ${
                isSelected && 'bg-white font-semibold text-gray-900'
            }`}
            onClick={() => onClick(id)}
        >
            {title}
        </div>
    )
}

export default Category
