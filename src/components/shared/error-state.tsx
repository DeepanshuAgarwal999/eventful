'use client'
import { Button } from '../ui/button'

const ErrorState = ({ title, message, onClick }: {
    title: string
    message: string
    onClick?: () => void
}) => {
    return (
        <div className="text-center py-12">
            <h1 className='text-2xl font-semibold'>{title}</h1>
            <p className="text-red-600 mb-4">Error loading artists: {message}</p>
            <Button variant="outline" onClick={onClick}>
                Try Again
            </Button>
        </div>
    )
}

export default ErrorState