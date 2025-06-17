// "use client";
// import React from "react";
// import Account from "./Account";
// import Settings from "./Setting";
// import Overview from "./Overview";
// import { MenuItem } from "../types/Menu";
// import Message from "./Message";
// import Community from "./Community";
// import Payment from "./Payment";
// import Statistics from "./Statistics";
// import Referral from "./Referral";

// type MenuInfoProps = {
//   selectedMenu: MenuItem;
// };

// export default function MenuInfo({ selectedMenu }: MenuInfoProps) {
//   switch (selectedMenu) {
//     case "overview":
//       return <Overview />;
//     case "messages":
//       return <Message />;
//     case "community":
//       return <Community />;
//     case "payments":
//       return <Payment />;
//     case "statistics":
//       return <Statistics />;
//     case "referrals":
//       return <Referral />;
//     case "accounts":
//       return <Account />;
//     case "settings":
//       return <Settings />;
//     default:
//       return (
//         <div className="bg-white p-8 w-full rounded-lg shadow-md text-black text-xl">
//            {selectedMenu} 
//         </div>
//       );
//   }
// }

"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { MenuItem } from "../types/Menu";
import { motion } from "framer-motion";

const Account = dynamic(() => import("./Account"));
const Settings = dynamic(() => import("./Setting"));
const Overview = dynamic(() => import("./Overview"));
const Message = dynamic(() => import("./Message"));
const Community = dynamic(() => import("./Community"));
const Payment = dynamic(() => import("./Payment"));
const Statistics = dynamic(() => import("./Statistics"));
const Referral = dynamic(() => import("./Referral"));

type MenuInfoProps = {
  selectedMenu: MenuItem;
};

export default function MenuInfo({ selectedMenu }: MenuInfoProps) {
  const renderComponent = () => {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-xl shadow text-gray-700 text-base"
          >
            <p className="italic">No content available for <strong>{selectedMenu}</strong>.</p>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      key={selectedMenu}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        {renderComponent()}
      </Suspense>
    </motion.div>
  );
}
