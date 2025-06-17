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
// import { MenuItem } from "../types/Menu"; // ✅ Import the correct type

// interface MenuProps {
//   selectedMenu: MenuItem;
//   onMenuSelect: (label: MenuItem) => void;
// }

// // Renamed to avoid conflict with the imported MenuItem type
// interface MenuOption {
//   label: MenuItem;
//   icon: React.ReactNode;
//   badge?: string;
// }

// export default function Menu({ selectedMenu, onMenuSelect }: MenuProps) {
//   const menuItems: MenuOption[] = [
//     { label: "overview", icon: <GoHomeFill /> },
//     { label: "messages", icon: <TfiEmail />, badge: "2" },
//     { label: "community", icon: <PiChatsCircle /> },
//     { label: "payments", icon: <HiOutlineWallet /> },
//     { label: "statistics", icon: <PiChartPieLight /> },
//     { label: "referrals", icon: <PiStarFourLight /> },
//   ];

//   const bottomItems: MenuOption[] = [
//     { label: "accounts", icon: <HiOutlineUserCircle /> },
//     { label: "settings", icon: <PiNutLight /> },
//   ];

//   const renderItem = ({ label, icon, badge }: MenuOption) => (
//     <div
//       key={label}
//       className={`flex gap-3 text-white cursor-pointer ${
//         selectedMenu === label ? "font-bold underline" : ""
//       }`}
//       onClick={() => onMenuSelect(label)}
//     >
//       <div className="text-[15px] mt-[2px]">{icon}</div>
//       <p className="text-[13px]">{label}</p>
//       {badge && (
//         <div className="bg-[#E34255] text-[8px] text-white px-[4px] rounded-sm h-[12px] flex items-center">
//           {badge}
//         </div>
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
// };

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoHomeFill } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { HiOutlineWallet, HiOutlineUserCircle } from "react-icons/hi2";
import {
  PiChatsCircle,
  PiChartPieLight,
  PiStarFourLight,
  PiNutLight,
} from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MenuItem } from "../types/Menu";

interface MenuProps {
  selectedMenu: MenuItem;
  onMenuSelect: (label: MenuItem) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

interface MenuOption {
  label: MenuItem;
  icon: React.ReactNode;
  badge?: string;
}

export default function Menu({
  selectedMenu,
  onMenuSelect,
  isMobileMenuOpen,
  toggleMobileMenu,
}: MenuProps) {
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

  const handleMenuItemClick = (label: MenuItem) => {
    onMenuSelect(label);
    // Close mobile menu when item is selected
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const renderItem = ({ label, icon, badge }: MenuOption) => (
    <div
      key={label}
      className={`flex gap-3 text-white cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors ${
        selectedMenu === label ? "font-bold bg-white/20" : ""
      }`}
      onClick={() => handleMenuItemClick(label)}
    >
      <div className="text-[15px] mt-[2px]">{icon}</div>
      <p className="text-[13px] capitalize">{label}</p>
      {badge && (
        <div className="bg-[#E34255] text-[8px] text-white px-[4px] rounded-sm h-[12px] flex items-center ml-auto">
          {badge}
        </div>
      )}
    </div>
  );

  // Desktop Menu
  const DesktopMenu = () => (
    <div className="hidden capitalize px-20 md:flex flex-col gap-28 md:gap-10 mt-14 nav-link">
      <div className="flex flex-col gap-4">{menuItems.map(renderItem)}</div>
      <div className="flex flex-col gap-4">{bottomItems.map(renderItem)}</div>
    </div>
  );

  // Mobile Menu Overlay
  const MobileMenuOverlay = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />

          {/* Sliding Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-lg font-semibold">Menu</h2>
                <div className="flex items-center gap-3">
                  <p className="text-white text-[12px]">EN</p>
                  <IoIosNotificationsOutline className="text-white text-xl" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-6">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <h3 className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
                    Main Menu
                  </h3>
                  {menuItems.map(renderItem)}
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
                    Account
                  </h3>
                  {bottomItems.map(renderItem)}
                </div>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="p-6 border-t border-white/20 mt-auto">
              <div className="flex bg-[#FCFBF9] ps-3 pe-4 rounded-xl">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none bg-[#FCFBF9] py-2 text-black flex-1 text-sm"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopMenu />
      <MobileMenuOverlay />
    </>
  );
}

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
// import { MenuItem } from "../types/Menu";

// interface MenuProps {
//   selectedMenu: MenuItem;
//   onMenuSelect: (label: MenuItem) => void;
// }

// interface MenuOption {
//   label: MenuItem;
//   icon: React.ReactNode;
//   badge?: string;
// }

// export default function Menu({ selectedMenu, onMenuSelect }: MenuProps) {
//   const menuItems: MenuOption[] = [
//     { label: "overview", icon: <GoHomeFill /> },
//     { label: "messages", icon: <TfiEmail />, badge: "2" },
//     { label: "community", icon: <PiChatsCircle /> },
//     { label: "payments", icon: <HiOutlineWallet /> },
//     { label: "statistics", icon: <PiChartPieLight /> },
//     { label: "referrals", icon: <PiStarFourLight /> },
//   ];

//   const bottomItems: MenuOption[] = [
//     { label: "accounts", icon: <HiOutlineUserCircle /> },
//     { label: "settings", icon: <PiNutLight /> },
//   ];

//   const renderItem = ({ label, icon, badge }: MenuOption) => (
//     <div
//       key={label}
//       className={`flex items-center gap-3 cursor-pointer px-2 py-1 rounded-md transition-all duration-200 ${
//         selectedMenu === label
//           ? "bg-white/10 text-white font-semibold"
//           : "text-white/70 hover:bg-white/10 hover:text-white"
//       }`}
//       onClick={() => onMenuSelect(label)}
//     >
//       <div className="text-[16px]">{icon}</div>
//       <p className="text-[13px] capitalize">{label}</p>
//       {badge && (
//         <span className="ml-auto text-[10px] bg-[#E34255] text-white px-[6px] rounded-full h-[16px] flex items-center justify-center">
//           {badge}
//         </span>
//       )}
//     </div>
//   );

//   return (
//     <div className="px-6 py-10 flex flex-col justify-between h-full">
//       <div className="flex flex-col gap-4">
//         {menuItems.map(renderItem)}
//       </div>
//       <div className="flex flex-col gap-4">
//         {bottomItems.map(renderItem)}
//       </div>
//     </div>
//   );
// }
