import React from "react";
import { PiArmchairLight } from "react-icons/pi";
import { PiCoinsLight } from "react-icons/pi";
import { PiTaxiLight } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiBusLight } from "react-icons/pi";
import { LiaPlaneSolid } from "react-icons/lia";
import { PiGasPumpLight } from "react-icons/pi";
import { CiDumbbell } from "react-icons/ci";
import Image from "next/image";

export default function Overview() {
  return (
    <div className="bg-[#FCFBF9] rounded-3xl p-4 md:p-7">
      <div className="overflow-y-auto max-h-[85vh]">
        {/* Main Content - Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-3">
          {/* Left Column - Main Dashboard Content */}
          <div className="flex-1 lg:menu-inner-1">
            {/* Dashboard and Upcoming Payments - Stack on mobile */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-3">
              {/* Dashboard Card */}
              <div className="text-[#2E335B] flex-1">
                <p className="mb-3 md:mb-5 font-bold text-[14px]">Dashboard</p>
                <div className="w-full overflow-hidden">
                  <Image
                    src="/images/Card.png"
                    alt="card"
                    width={500}
                    height={300}
                    className="w-full h-auto max-w-full"
                  />
                </div>
              </div>

              {/* Upcoming Payments */}
              <div className="text-[#2E335B] flex-1">
                <p className="mb-3 md:mb-5 font-bold text-[14px]">
                  Upcoming Payments
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Freelance Card */}
                  <div className="bg-[#F5F5F5] rounded-3xl p-4 px-6 min-h-[160px] md:h-[180px] flex flex-col items-center">
                    <div className="bg-[#2E335B] w-[50px] md:w-[65px] p-2 md:p-3 rounded-xl">
                      <PiArmchairLight className="text-white text-[30px] md:text-[40px]" />
                    </div>
                    <p className="font-bold mt-3 text-[14px] md:text-base">
                      Freelance
                    </p>
                    <p className="text-[9px] md:text-[10px] -mt-[6px] text-gray-600">
                      Unregular payments
                    </p>
                    <p className="font-bold mt-3 text-[18px] md:text-[20px]">
                      $1,500
                    </p>
                  </div>

                  {/* Salary Card */}
                  <div className="bg-[#F5F5F5] rounded-3xl p-4 px-6 min-h-[160px] md:h-[180px] flex flex-col items-center">
                    <div className="bg-[#2E335B] w-[50px] md:w-[65px] p-2 md:p-3 rounded-xl">
                      <PiCoinsLight className="text-white text-[30px] md:text-[40px]" />
                    </div>
                    <p className="font-bold mt-3 text-[14px] md:text-base">
                      Salary
                    </p>
                    <p className="text-[9px] md:text-[10px] -mt-[6px] text-gray-600">
                      Regular payments
                    </p>
                    <p className="font-bold mt-3 text-[18px] md:text-[20px]">
                      $4,000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="text-[#2E335B] mt-6 md:mt-5">
              <div className="flex justify-between items-center mb-4 md:mb-5">
                <p className="font-bold text-[14px]">Recent transactions</p>
                <select className="text-[10px] h-6 md:h-5 px-2 md:ps-1 md:pe-5 rounded-md border-[1px] border-[#2e335b54] outline-none bg-white">
                  <option>Sort by</option>
                  <option>Date</option>
                  <option>Amount</option>
                </select>
              </div>

              {/* Mobile Transaction List */}
              <div className="block md:hidden space-y-3">
                {[
                  {
                    icon: PiTaxiLight,
                    title: "Taxi Trip",
                    date: "03 Aug 2022, 15:43",
                    amount: "$156.50",
                  },
                  {
                    icon: PiBusLight,
                    title: "Public Transport",
                    date: "01 Aug 2022, 12:00",
                    amount: "$2.50",
                  },
                  {
                    icon: LiaPlaneSolid,
                    title: "Plane Tickets",
                    date: "28 Jul 2022, 08:30",
                    amount: "$70",
                  },
                  {
                    icon: PiGasPumpLight,
                    title: "Gas Station",
                    date: "28 Jul 2022, 10:50",
                    amount: "$30.75",
                  },
                  {
                    icon: CiDumbbell,
                    title: "Gym",
                    date: "28 Jul 2022, 02:15",
                    amount: "$100.00",
                  },
                ].map((transaction, index) => {
                  const IconComponent = transaction.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-[#F5F5F5] p-2 rounded-lg">
                          <IconComponent className="text-[18px] text-[#2E335B]" />
                        </div>
                        <div>
                          <p className="font-bold text-[12px]">
                            {transaction.title}
                          </p>
                          <p className="text-[10px] text-[#2e335b70]">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[12px]">
                          {transaction.amount}
                        </p>
                        <HiDotsHorizontal className="text-[#2e335b70]" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Transaction Table */}
              <div className="hidden md:block">
                <div className="flex justify-between">
                  <div className="flex flex-col justify-between gap-4">
                    <PiTaxiLight className="text-[20px]" />
                    <PiBusLight className="text-[20px]" />
                    <LiaPlaneSolid className="text-[20px]" />
                    <PiGasPumpLight className="text-[20px]" />
                    <CiDumbbell className="text-[20px]" />
                  </div>

                  <div className="text-[12px] font-bold flex flex-col justify-between">
                    <p>Taxi Trip</p>
                    <p>Public Transport</p>
                    <p>Plane Tickets</p>
                    <p>Gas Station</p>
                    <p>Gym</p>
                  </div>

                  <div className="text-[10px] text-[#2e335b70] flex flex-col justify-between">
                    <p>03 Aug 2022, 15:43</p>
                    <p>01 Aug 2022, 12:00</p>
                    <p>28 Jul 2022, 08:30</p>
                    <p>28 Jul 2022, 10:50</p>
                    <p>28 Jul 2022, 02:15</p>
                  </div>

                  <div className="text-[12px] font-bold flex flex-col justify-between">
                    <p>$156.50</p>
                    <p>$2.50</p>
                    <p>$70</p>
                    <p>$30.75</p>
                    <p>$100.00</p>
                  </div>

                  <div className="flex flex-col justify-between">
                    <HiDotsHorizontal />
                    <HiDotsHorizontal />
                    <HiDotsHorizontal />
                    <HiDotsHorizontal />
                    <HiDotsHorizontal />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics and Cards */}
          <div className="w-full lg:w-80 lg:menu-inner-2 bg-[#F5F5F5] rounded-xl p-4 text-[#2E335B]">
            {/* Spent Today Section */}
            <div className="mb-6">
              <p className="text-[8px] font-semibold mb-2">Spent this day</p>
              <div className="flex justify-between items-start mb-4">
                <p className="font-bold text-[20px] md:text-[24px]">$259.75</p>
                <select className="bg-[#F5F5F5] text-[10px] h-6 px-2 rounded-md border-[1px] border-[#2e335b54] outline-none">
                  <option>Week</option>
                  <option>Month</option>
                  <option>Year</option>
                </select>
              </div>

              {/* Chart */}
              <div className="w-full overflow-hidden">
                <Image
                  src="/images/Table.png"
                  alt="chart"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Available Cards Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="font-bold text-[14px]">Available cards</p>
                <button className="text-[#2e335b6c] text-[12px] hover:text-[#2e335b] transition-colors">
                  view all
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-[#DBDDDC] flex justify-between items-center p-3 rounded-lg hover:bg-[#d0d2d1] transition-colors">
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-[14px]">
                      98,500
                      <span className="uppercase text-[#2e335b3d] text-[10px] ml-1">
                        usd
                      </span>
                    </p>
                    <p className="text-[11px] text-[#2e335b70]">****4141</p>
                  </div>
                  <div className="w-2 h-2 bg-[#2E335B] rounded-full"></div>
                </div>

                <div className="bg-[#DBDDDC] flex justify-between items-center p-3 rounded-lg hover:bg-[#d0d2d1] transition-colors">
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-[14px]">
                      98,500
                      <span className="uppercase text-[#2e335b3d] text-[10px] ml-1">
                        usd
                      </span>
                    </p>
                    <p className="text-[11px] text-[#2e335b70]">****4141</p>
                  </div>
                  <div className="w-2 h-2 bg-[#2E335B] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
