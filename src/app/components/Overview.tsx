import React from 'react'
import { PiArmchairLight } from "react-icons/pi";
import { PiCoinsLight } from "react-icons/pi";
import { PiTaxiLight } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiBusLight } from "react-icons/pi";
import { LiaPlaneSolid } from "react-icons/lia";
import { PiGasPumpLight } from "react-icons/pi";
import { CiDumbbell } from "react-icons/ci";
import Image from 'next/image';

export default function Overview() {
  return (
    <div className='bg-[#FCFBF9] rounded-3xl p-7'>
        <div className='flex gap-3'>
            <div className='menu-inner-1'>
                <div className='flex gap-3'>
                    <div className="text-[#2E335B]">
                        <p className='mb-5 font-bold text-[14px]'>Dashboard</p>
                        <Image src="/images/Card.png" alt='card' />
                    </div>

                    <div className="text-[#2E335B]">
                        <p className="mb-5 font-bold text-[14px]">Upcoming Payments</p>
                        <div className="flex gap-4">
                            <div className="bg-[#F5F5F5] rounded-3xl p-4 px-6 h-[180px]">
                                <div className="bg-[#2E335B] w-[65px] p-3 rounded-xl">
                                    <PiArmchairLight className='text-white text-[40px]' />
                                </div>
                                <p className="font-bold mt-3">Freelance</p>
                                <p className="text-[10px] -mt-[6px]">Unregular payments</p>
                                <p className="font-bold mt-3 text-[20px]">$1,500</p>
                            </div>
                            
                            <div className="bg-[#F5F5F5] rounded-3xl p-4 px-7 h-[180px]">
                                <div className="bg-[#2E335B] w-[65px] p-3 rounded-xl">
                                    <PiCoinsLight className='text-white text-[40px]' />
                                </div>
                                <p className="font-bold mt-3">Salary</p>
                                <p className="text-[10px] -mt-[6px]">Regular payments</p>
                                <p className="font-bold mt-3 text-[20px]">$4,000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[#2E335B] mt-5">
                    <div className='flex justify-between'>
                        <p className='mb-5 font-bold text-[14px]'>Recent transactions</p>
                        <select className='text-[10px] h-5 ps-1 pe-5 rounded-md border-[1px] border-[#2e335b54] outline-none'>
                            <option>Sort by</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <div className='flex flex-col justify-between gap-4'>
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

                        <div className='text-[12px] font-bold flex flex-col justify-between'>
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

            <div className="menu-inner-2 bg-[#F5F5F5] rounded-xl p-4 text-[#2E335B]">
                <p className='text-[8px] font-semibold'>Spent this day</p>
                <div className="flex justify-between mb-2">
                    <p className="font-bold text-[20px]">$259.75</p>
                    <select className='bg-[#F5F5F5] text-[10px] h-5 ps-1 pe-2 rounded-md border-[1px] border-[#2e335b54] outline-none mt-1'>
                        <option>Week</option>
                    </select>
                </div>

                <Image src="/images/Table.png" alt="chart" />

                <div className="mt-4">
                    <div className="flex justify-between">
                        <p className='font-bold'>Available cards</p>
                        <p className='text-[#2e335b6c] text-[12px]'>view all</p>
                    </div>
                    <div className="flex flex-col gap-3 p-2 mt-2">
                        <div className="bg-[#DBDDDC] flex gap-4 p-3 rounded-lg">
                            <p className="font-bold">98,500<span className="uppercase text-[#2e335b3d] text-[10px]">usd</span></p>
                            <p className='text-[11px] mt-1'>_4141</p>
                        </div>

                        <div className="bg-[#DBDDDC] flex gap-4 p-3 rounded-lg">
                            <p className="font-bold">98,500<span className="uppercase text-[#2e335b3d] text-[10px]">usd</span></p>
                            <p className='text-[11px] mt-1'>_4141</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
