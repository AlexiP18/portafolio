"use client"

import { User, TrendingUp, FolderOpen, BarChart3, GraduationCap, Mail, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const menuItems = [
	{
		name: "Sobre mí",
		href: "/sobre-mi",
		icon: User,
	},
	{
		name: "Experiencia",
		href: "/experience",
		icon: TrendingUp,
	},
	{
		name: "Proyectos",
		href: "/proyectos",
		icon: FolderOpen,
	},
	{
		name: "Skills",
		href: "/skills",
		icon: BarChart3,
	},
	{
		name: "Educación",
		href: "/education",
		icon: GraduationCap,
	},
	{
		name: "Contacto",
		href: "https://wa.link/gqwair",
		icon: Mail,
	},
]

export function Sidebar() {
	const pathname = usePathname()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false)
	}

	return (
		<>
			{/* Header móvil */}
			<div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
				<div className="flex items-center justify-between px-4 py-3">
					{/* Logo y nombre */}
					<Link
						href="/"
						className="flex items-center space-x-3"
						onClick={closeMobileMenu}
					>
						<Link href="/" onClick={(e) => {
							e.stopPropagation();
							closeMobileMenu();
						}}>
							<div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200">
								<Image
									src="https://scontent.fatf6-1.fna.fbcdn.net/v/t39.30808-1/482063674_122098752290799599_4639200773569733832_n.jpg?stp=c219.0.864.864a_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=1cnEuO3TAx4Q7kNvwFadUFF&_nc_oc=Adn-kIeTUNzzJu8bMVLfUSHeTYF8b4MBbflKKqNLMqW5OU5KsUj1Tkn_Ieqip5swMbg&_nc_zt=24&_nc_ht=scontent.fatf6-1.fna&_nc_gid=1Rj8s84CAcqY-mEIEiC3vQ&oh=00_AfOdguSZAs2oXvotJXG7jP_3a8kI3Jf7w_xqQ7IlxUAEVQ&oe=686B5D55"
									alt="Profile"
									width={40}
									height={40}
									className="w-full h-full object-cover"
								/>
							</div>
						</Link>
						<div>
							<h2 className="text-lg font-semibold text-gray-800">
								Alexis Poaquiza
							</h2>
							<p className="text-xs text-gray-600">
								Ingeniero de Software
							</p>
						</div>
					</Link>

					{/* Botón hamburguesa */}
					<button
						onClick={toggleMobileMenu}
						className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6 text-gray-600" />
						) : (
							<Menu className="w-6 h-6 text-gray-600" />
						)}
					</button>
				</div>
			</div>

			{/* Overlay para móvil */}
			{isMobileMenuOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={closeMobileMenu}
				/>
			)}

			{/* Menú móvil deslizable */}
			<div
				className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Header del menú móvil */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<Link
						href="/"
						className="flex items-center space-x-3"
						onClick={closeMobileMenu}
					>
						<Link href="/" onClick={(e) => {
							e.stopPropagation();
							closeMobileMenu();
						}}>
							<div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200">
								<Image
									src="https://scontent.fatf6-1.fna.fbcdn.net/v/t39.30808-1/482063674_122098752290799599_4639200773569733832_n.jpg?stp=c219.0.864.864a_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=1cnEuO3TAx4Q7kNvwFadUFF&_nc_oc=Adn-kIeTUNzzJu8bMVLfUSHeTYF8b4MBbflKKqNLMqW5OU5KsUj1Tkn_Ieqip5swMbg&_nc_zt=24&_nc_ht=scontent.fatf6-1.fna&_nc_gid=1Rj8s84CAcqY-mEIEiC3vQ&oh=00_AfOdguSZAs2oXvotJXG7jP_3a8kI3Jf7w_xqQ7IlxUAEVQ&oe=686B5D55"
									alt="Profile"
									width={40}
									height={40}
									className="w-full h-full object-cover"
								/>
							</div>
						</Link>
						<div>
							<h2 className="text-lg font-semibold text-gray-800">
								Alexis Poaquiza
							</h2>
							<p className="text-xs text-gray-600">
								Ingeniero de Software
							</p>
						</div>
					</Link>
					<button
						onClick={closeMobileMenu}
						className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
					>
						<X className="w-5 h-5 text-gray-600" />
					</button>
				</div>

				{/* Navigation Menu móvil */}
				<nav className="flex-1 px-4 py-4">
					<ul className="space-y-2">
						{menuItems.map((item) => {
							const Icon = item.icon
							const isActive = pathname === item.href

							return (
								<li key={item.name}>
									<Link
										href={item.href}
										onClick={closeMobileMenu}
										className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
											isActive
												? "bg-teal-50 text-teal-700 border-l-4 border-teal-500"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
										}`}
									>
										<Icon
											className={`w-5 h-5 mr-3 ${
												isActive ? "text-teal-600" : "text-gray-500"
											}`}
										/>
										<span className="font-medium">{item.name}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>

				{/* Footer móvil */}
				<div className="p-4 border-t border-gray-200">
					<p className="text-xs text-gray-500 text-center">
						© 2024 Portafolio Personal
					</p>
				</div>
			</div>

			{/* Sidebar desktop (oculta en móvil) */}
			<div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex-col">
				{/* Profile Section */}
				<div className="flex flex-col items-center py-8 px-6">
					<div className="relative">
						<Link href="/" className="block">
							<div className="w-24 h-24 rounded-full border-4 border-teal-500 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
								<Image
									src="https://scontent.fatf6-1.fna.fbcdn.net/v/t39.30808-1/482063674_122098752290799599_4639200773569733832_n.jpg?stp=c219.0.864.864a_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=1cnEuO3TAx4Q7kNvwFadUFF&_nc_oc=Adn-kIeTUNzzJu8bMVLfUSHeTYF8b4MBbflKKqNLMqW5OU5KsUj1Tkn_Ieqip5swMbg&_nc_zt=24&_nc_ht=scontent.fatf6-1.fna&_nc_gid=1Rj8s84CAcqY-mEIEiC3vQ&oh=00_AfOdguSZAs2oXvotJXG7jP_3a8kI3Jf7w_xqQ7IlxUAEVQ&oe=686B5D55"
									alt="Profile"
									width={96}
									height={96}
									className="w-full h-full object-cover"
								/>
							</div>
						</Link>
					</div>
					<div className="mt-4 text-center">
						<h2 className="text-xl font-semibold text-gray-800">
							Alexis Poaquiza
						</h2>
						<p className="text-sm text-gray-600 mt-1">
							Ingeniero de Software
						</p>
					</div>
				</div>

				{/* Navigation Menu */}
				<nav className="flex-1 px-4">
					<ul className="space-y-2">
						{menuItems.map((item) => {
							const Icon = item.icon
							const isActive = pathname === item.href

							return (
								<li key={item.name}>
									<Link
										href={item.href}
										className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
											isActive
												? "bg-teal-50 text-teal-700 border-l-4 border-teal-500"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
										}`}
									>
										<Icon
											className={`w-5 h-5 mr-3 ${
												isActive ? "text-teal-600" : "text-gray-500"
											}`}
										/>
										<span className="font-medium">{item.name}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>

				{/* Footer */}
				<div className="p-4 border-t border-gray-200">
					<p className="text-xs text-gray-500 text-center">
						© 2024 Portafolio Personal
					</p>
				</div>
			</div>
		</>
	)
}
