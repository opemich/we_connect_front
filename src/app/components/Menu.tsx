// "use client"

// import React from 'react'
// import { GoHomeFill } from "react-icons/go";
// import { TfiEmail } from "react-icons/tfi";
// import { PiChatsCircle } from "react-icons/pi";
// import { HiOutlineWallet } from "react-icons/hi2";
// import { PiChartPieLight } from "react-icons/pi";
// import { PiStarFourLight } from "react-icons/pi";
// import { HiOutlineUserCircle } from "react-icons/hi2";
// import { PiNutLight } from "react-icons/pi";
// import Link from 'next/link';

// export default function Menu() {
//   return (
//     <div className='capitalize px-20 flex flex-col gap-28 mt-16 nav-link'>
//         <div className='flex flex-col gap-6'>
//             <div className='flex gap-3'>
//                 <GoHomeFill className='text-[16px] text-white mt-[2px]' />
//                 <p className='text-white text-[13px]'>overview</p>
//             </div>
//             <div className='flex gap-3 text-white'>
//                 <TfiEmail className='text-[14px] mt-[2px]' />
//                 <p className='text-[13px]'>messages</p>
//                 <div className='bg-[#E34255] text-[8px] text-white px-[2px] rounded-sm h-[10px] mt-1'>2</div>
//             </div>
//             <div className='flex gap-3 text-white'>
//                 <PiChatsCircle className='text-[15px] mt-[2px]' />
//                 <p className='text-[13px]'>community</p>
//             </div>
//             <div className='flex gap-3 text-white'>
//                 <HiOutlineWallet className='text-[15px] mt-[2px]' />
//                 <p className='text-[13px]'>payments</p>
//             </div>
//             <div className='flex gap-3 text-white'>
//                 <PiChartPieLight className='text-[15px] mt-[2px]' />
//                 <p className='text-[13px]'>statistics</p>
//             </div>
//             <div className='flex gap-3 text-white'>
//                 <PiStarFourLight className='text-[15px] mt-[2px]' />
//                 <p className='text-[13px]'>referrals</p>
//             </div>
//         </div>

//         <div className='flex flex-col gap-6'>
//             <Link href='/account'>
//                 <div className='flex gap-3 text-white'>
//                     <HiOutlineUserCircle className='text-[15px] mt-[2px]' />
//                     <p className='text-[13px]'>accounts</p>
//                 </div>
//             </Link>
//             <Link href='/setting'>
//                 <div className='flex gap-3 text-white'>
//                     <PiNutLight className='text-[15px] mt-[2px]' />
//                     <p className='text-[13px]'>settings</p>
//                 </div>
//             </Link>
//         </div>
//     </div>
//   )
// }


// // "use client";
// // import React, { useState } from "react";
// // import { GoHomeFill } from "react-icons/go";
// // import { TfiEmail } from "react-icons/tfi";
// // import { PiChatsCircle, PiChartPieLight, PiStarFourLight, PiNutLight } from "react-icons/pi";
// // import { HiOutlineWallet, HiOutlineUserCircle } from "react-icons/hi2";
// // import { HiMenu, HiX } from "react-icons/hi"; // ✅ FIX: Use HiMenu instead of HiMenuAlt3

// // export default function Menu() {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <div className="relative">
// //       {/* Burger Menu Button (Hidden on Large Screens) */}
// //       <button
// //         className="md:hidden text-2xl p-2 fixed top-4 left-4 bg-gray-200 rounded-full"
// //         onClick={() => setIsOpen(true)}
// //       >
// //         <HiMenu /> {/* ✅ FIX: Using HiMenu instead of HiMenuAlt3 */}
// //       </button>

// //       {/* Sidebar Menu */}
// //       <div
// //         className={`fixed top-0 left-0 h-screen bg-white w-64 p-5 shadow-lg transition-transform duration-300 ${
// //           isOpen ? "translate-x-0" : "-translate-x-full"
// //         } md:relative md:translate-x-0 md:block`}
// //       >
// //         {/* Close Button (Only Visible on Small Screens) */}
// //         <button
// //           className="md:hidden text-2xl absolute top-4 right-4"
// //           onClick={() => setIsOpen(false)}
// //         >
// //           <HiX />
// //         </button>

// //         <div className="capitalize flex flex-col gap-10 mt-16">
// //           <div className="flex flex-col gap-6">
// //             <NavItem icon={<GoHomeFill />} label="Overview" />
// //             <NavItem icon={<TfiEmail />} label="Messages" badge="2" />
// //             <NavItem icon={<PiChatsCircle />} label="Community" />
// //             <NavItem icon={<HiOutlineWallet />} label="Payments" />
// //             <NavItem icon={<PiChartPieLight />} label="Statistics" />
// //             <NavItem icon={<PiStarFourLight />} label="Referrals" />
// //           </div>

// //           <div className="flex flex-col gap-6">
// //             <NavItem icon={<HiOutlineUserCircle />} label="Accounts" />
// //             <NavItem icon={<PiNutLight />} label="Settings" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ✅ Reusable Nav Item Component
// // const NavItem = ({ icon, label, badge }) => (
// //   <div className="flex gap-3 text-white">
// //     <div className="text-[15px] mt-[2px]">{icon}</div>
// //     <p className="text-[13px]">{label}</p>
// //     {badge && (
// //       <div className="bg-[#E34255] text-[8px] text-white px-[4px] rounded-sm h-[12px] flex items-center">
// //         {badge}
// //       </div>
// //     )}
// //   </div>
// // );

// "use client";

// import React from "react";
// import { GoHomeFill } from "react-icons/go";
// import { TfiEmail } from "react-icons/tfi";
// import {
//   HiOutlineWallet,
//   HiOutlineUserCircle,
// } from "react-icons/hi2";
// import {
//   PiChatsCircle,
//   PiChartPieLight,
//   PiStarFourLight,
//   PiNutLight,
// } from "react-icons/pi";

// interface MenuProps {
//   selectedMenu: string;
//   onMenuSelect: (label: string) => void;
// }

// interface MenuItem {
//   label: string;
//   icon: React.ReactNode;
//   badge?: string; // Optional (since not all items have badges)
// }

// export default function Menu({ selectedMenu, onMenuSelect }: MenuProps) {
//   const menuItems: MenuItem[] = [
//     { label: "overview", icon: <GoHomeFill /> },
//     { label: "messages", icon: <TfiEmail />, badge: "2" },
//     { label: "community", icon: <PiChatsCircle /> },
//     { label: "payments", icon: <HiOutlineWallet /> },
//     { label: "statistics", icon: <PiChartPieLight /> },
//     { label: "referrals", icon: <PiStarFourLight /> },
//   ];

//   const bottomItems: MenuItem[] = [
//     { label: "accounts", icon: <HiOutlineUserCircle /> },
//     { label: "settings", icon: <PiNutLight /> },
//   ];

//   const renderItem = ({ label, icon, badge }: MenuItem) => (
//     <div
//     key={label}
//     className={`flex gap-3 text-white cursor-pointer ${
//       selectedMenu === label ? "font-bold underline" : ""
//     }`}
//     onClick={() => onMenuSelect(label)}
//   >
//     <div className="text-[15px] mt-[2px]">{icon}</div>
//     <p className="text-[13px]">{label}</p>
//     {badge && (
//       <div className="bg-[#E34255] text-[8px] text-white px-[4px] rounded-sm h-[12px] flex items-center">
//         {badge}
//       </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="capitalize px-20 flex flex-col gap-28 mt-16 nav-link">
//       <div className="flex flex-col gap-6">
//         {menuItems.map(renderItem)}
//       </div>
//       <div className="flex flex-col gap-6">
//         {bottomItems.map(renderItem)}
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import {
  HiOutlineWallet,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import {
  PiChatsCircle,
  PiChartPieLight,
  PiStarFourLight,
  PiNutLight,
} from "react-icons/pi";
import { MenuItem } from "../types/Menu"; // ✅ Import the correct type

interface MenuProps {
  selectedMenu: MenuItem;
  onMenuSelect: (label: MenuItem) => void;
}

// Renamed to avoid conflict with the imported MenuItem type
interface MenuOption {
  label: MenuItem;
  icon: React.ReactNode;
  badge?: string;
}

export default function Menu({ selectedMenu, onMenuSelect }: MenuProps) {
  const menuItems: MenuOption[] = [
    { label: "overview", icon: <GoHomeFill /> },
    { label: "messages", icon: <TfiEmail />, badge: "2" },
    { label: "community", icon: <PiChatsCircle /> },
    { label: "payments", icon: <HiOutlineWallet /> },
    { label: "statistics", icon: <PiChartPieLight /> },
    { label: "referrals", icon: <PiStarFourLight /> },
  ];

  const bottomItems: MenuOption[] = [
    { label: "accounts", icon: <HiOutlineUserCircle /> },
    { label: "settings", icon: <PiNutLight /> },
  ];

  const renderItem = ({ label, icon, badge }: MenuOption) => (
    <div
      key={label}
      className={`flex gap-3 text-white cursor-pointer ${
        selectedMenu === label ? "font-bold underline" : ""
      }`}
      onClick={() => onMenuSelect(label)}
    >
      <div className="text-[15px] mt-[2px]">{icon}</div>
      <p className="text-[13px]">{label}</p>
      {badge && (
        <div className="bg-[#E34255] text-[8px] text-white px-[4px] rounded-sm h-[12px] flex items-center">
          {badge}
        </div>
      )}
    </div>
  );

  return (
    <div className="capitalize px-20 flex flex-col gap-28 mt-16 nav-link">
      <div className="flex flex-col gap-6">
        {menuItems.map(renderItem)}
      </div>
      <div className="flex flex-col gap-6">
        {bottomItems.map(renderItem)}
      </div>
    </div>
  );
};
