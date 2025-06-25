
const Skeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[4/3] rounded-t-xl"></div>
                    <div className="p-6 space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Skeleton