import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    let [isOpen, setIsOpen] = useState(false);

    let toggleMenu = () => {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }
    return (
        <>
        <nav className={`fixed w-full bg-gray-700 p-4 text-white ${!isOpen? 'h-16':''} `}>
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold">LiveScore</div>
                {/* Menu Desktop */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/about" className="hover:underline">About</Link></li>
                    <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                </ul>
                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                {/* Menu Mobile */}
            </div>
                {isOpen && (
                    <ul className="md:hidden py-2 space-y-2">
                        <li className="hover:underline"><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li className="hover:underline"><Link to="/about" onClick={toggleMenu}>About</Link></li>
                        <li className="hover:underline"><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                    </ul>
                )}
        </nav>
        <main className="pt-16"></main>
        </>
        
    );

}


export default Navbar;