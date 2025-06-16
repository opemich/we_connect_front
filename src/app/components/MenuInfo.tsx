"use client";
import React from "react";
import Account from "./Account";
import Settings from "./Setting";
import Overview from "./Overview";
import { MenuItem } from "../types/Menu";
import Message from "./Message";
import Community from "./Community";
import Payment from "./Payment";
import Statistics from "./Statistics";
import Referral from "./Referral";

type MenuInfoProps = {
  selectedMenu: MenuItem;
};

export default function MenuInfo({ selectedMenu }: MenuInfoProps) {
  switch (selectedMenu) {
    case "overview":
      return <Overview />;
    case "messages":
      return <Message />;
    case "community":
      return <Community />;
    case "payments":
      return <Payment />;
    case "statistics":
      return <Statistics />;
    case "referrals":
      return <Referral />;
    case "accounts":
      return <Account />;
    case "settings":
      return <Settings />;
    default:
      return (
        <div className="bg-white p-8 w-full rounded-lg shadow-md text-black text-xl">
           {selectedMenu} 
        </div>
      );
  }
}

// import { MenuItem } from "../types/Menu";

// type MenuInfoProps = {
//   activeMenu: MenuItem;
// };

// export default function MenuInfo({ activeMenu }: MenuInfoProps) {
//   return (
//     <div className="bg-white p-8 flex-1 rounded-lg">
//       {activeMenu === "accounts" && <div>Account Info</div>}
//       {activeMenu === "settings" && <div>Settings Info</div>}
//       {/* Handle other menu items as needed */}
//     </div>
//   );
// }
