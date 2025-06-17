// "use client";
// import React from "react";
// import { CiSearch } from "react-icons/ci";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { useUser } from "../context/userContext";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await fetch("http://localhost:5000/api/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       setUsername(data.username);
//     };

//     fetchUser();
//   }, []);


//   return (
//     <div className="flex justify-between px-20 mt-2">
//       <div className="flex gap-3">
//         <div className="flex gap-1">
//           <img
//             src="/images/navbrand.png"
//             alt="brand name"
//             className="w-7 h-8 "
//           />
//           <p className="mt-1 ms-1 font-bold text-white text-[20px] capitalize">
//             {username ? `Welcome, ${username}` : "Loading..."}
//           </p>
//         </div>
//         <div className="flex bg-[#FCFBF9] ps-2 pe-9 ms-6 rounded-xl">
//           <CiSearch className="text-black mt-2.5" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="border-none outline-none bg-[#FCFBF9] ms-1"
//           />
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <p className="text-white text-[12px] mt-2">EN</p>
//         <IoIosNotificationsOutline className="mt-2 text-white" />
//         <img src="/images/Avatar.png" alt="Profile Image" className="w-8 h-8" />
//       </div>
//     </div>
//   );
// }




// 'use client'

// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react';

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const navItems = [
//     { href: '/about', label: 'About' },
//     { href: '/services', label: 'Services' },
//     { href: '/contact', label: 'Contact' },
//   ];

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link href="/" className="text-xl font-bold text-gray-800">
//           MyBrand
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex space-x-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`text-gray-700 hover:text-gray-900 ${pathname === item.href ? 'font-bold text-blue-600' : ''}`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-gray-700"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <nav className="md:hidden bg-white shadow-md p-4 space-y-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`block text-gray-700 hover:text-gray-900 ${pathname === item.href ? 'font-bold text-blue-600' : ''}`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;



// "use client";
// import React, { useEffect } from "react";
// import { CiSearch } from "react-icons/ci";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { useUser } from "../context/userContext";
// import Image from "next/image";

// export default function Header() {
//   const { user, refreshUser } = useUser();

//   useEffect(() => {
//     refreshUser(); // Ensures user data is current
//   }, [refreshUser]);

//  const imageSrc = user?.profilePicture
//   ? `${process.env.NEXT_PUBLIC_API_URL}/${user.profilePicture.replace(/^\/+/, '')}`
//   : "/images/Avatar.png";


//   return (
//     <div className="flex justify-between px-20 mt-2">
//       <div className="flex gap-3">
//         <div className="flex gap-1">
//           <Image
//             width={28}
//             height={32}
//             src="/images/navbrand.png"
//             alt="brand name"
//             className="w-7 h-8"
//           />
//           <p className="mt-1 ms-1 font-bold text-white text-[20px] capitalize">
//             {user?.username ? `Welcome, ${user.username}` : "Loading..."}
//           </p>
//         </div>
//         <div className="flex bg-[#FCFBF9] ps-2 pe-9 ms-6 rounded-xl">
//           <CiSearch className="text-black mt-2" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="border-none outline-none bg-[#FCFBF9] ms-1 text-black"
//           />
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <p className="text-white text-[12px] mt-2">EN</p>
//         <IoIosNotificationsOutline className="mt-2 text-white" />
//         <Image
//           width={32}
//           height={32}
//           src={imageSrc}
//           alt="Profile"
//           className="w-8 h-8 rounded-full object-cover"
//         />
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useUser } from "../context/userContext";
import Image from "next/image";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function Header({ isMobileMenuOpen, toggleMobileMenu }: HeaderProps) {
  const { user, refreshUser } = useUser();

  useEffect(() => {
    refreshUser(); // Ensures user data is current
  }, [refreshUser]);

  const imageSrc = user?.profilePicture
    ? `${process.env.NEXT_PUBLIC_API_URL}/${user.profilePicture.replace(/^\/+/, '')}`
    : "/images/Avatar.png";

  return (
    <div className="flex justify-between px-4 md:px-20 mt-2">
      <div className="flex gap-3">
        <div className="flex gap-1">
          <Image
            width={28}
            height={32}
            src="/images/navbrand.png"
            alt="brand name"
            className="w-7 h-8"
          />
          <p className="mt-1 ms-1 font-bold text-white text-[16px] md:text-[20px] capitalize">
            {user?.username ? `Welcome, ${user.username}` : "Loading..."}
          </p>
        </div>
        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex bg-[#FCFBF9] ps-2 pe-9 ms-6 rounded-xl">
          <CiSearch className="text-black mt-2" />
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none bg-[#FCFBF9] ms-1 text-black"
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {/* Desktop menu items */}
        <div className="hidden md:flex gap-4 items-center">
          <p className="text-white text-[12px]">EN</p>
          <IoIosNotificationsOutline className="text-white" />
          <Image
            width={32}
            height={32}
            src={imageSrc}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>

        {/* Mobile profile (visible when menu is closed) */}
        <div className="md:hidden">
          <Image
            width={32}
            height={32}
            src={imageSrc}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white text-2xl p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>
    </div>
  );
}