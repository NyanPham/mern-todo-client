interface TooltipProps {
    children: React.ReactNode
    title: string
    description?: string
}

const Tooltip: React.FC<TooltipProps> = ({ children, title, description }) => {
    return (
        <>
            {children}
            <div className="">
                <h3 className="">{title}</h3>
                <h4 className="">{description}</h4>
            </div>
        </>
    )
}

export default Tooltip
