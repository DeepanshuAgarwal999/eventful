'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react'

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/artists', label: 'Artists' }
]

const ctaButtons = [
    { href: '/artists/onboarding', label: 'Join us as an Artist', variant: 'outline' as const },
    { href: '/manager', label: 'Dashboard', variant: 'default' as const }
]

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href={'/'} className="text-2xl font-bold text-primary">Eventful</Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {ctaButtons.map((button) => (
                            <Link key={button.href} href={button.href}>
                                <Button variant={button.variant}>{button.label}</Button>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] px-5 sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="text-left">Navigation</SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col justify-between space-y-6 my-6 h-full">
                                    {/* Navigation Links */}
                                    <nav className="flex flex-col space-y-4 text-center">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="text-lg font-medium text-gray-600 hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </nav>

                                    <div className="flex flex-col space-y-3 pt-4 border-t">
                                        {ctaButtons.map((button) => (
                                            <Link key={button.href} href={button.href}>
                                                <Button
                                                    variant={button.variant}
                                                    className="w-full"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {button.label}
                                                </Button>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header