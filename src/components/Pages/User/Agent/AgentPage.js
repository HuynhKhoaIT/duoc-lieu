"use client";
import { useState } from "react";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

import useAuth from "@/hooks/useAuth";
import { maskPhone } from "@/utils";

import styles from "./ContactForm.module.scss";

function AccordionItem({ item, level = 1 }) {
    const [ open, setOpen ] = useState(false);
    const hasChildren = item?.referrals && item?.referrals.length > 0;

    return (
        <div className="border-l pl-3 mt-2">
            <button
                className={styles.btnItem}
                onClick={() => hasChildren && setOpen(!open)}
            >
                {item.name} | {maskPhone(item.phone_number)}{" "} | {item.member_sequence}
                {/* | {(item.member_sequence * 1).toLocaleString("vi-VN")} */}
            </button>

            <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out pl-4`}
                style={{ maxHeight: open ? "10000px" : "0px" }}
            >
                {hasChildren &&
                    item?.referrals?.map((child) => (
                        <AccordionItem
                            key={child.id}
                            item={child}
                            level={level + 1}
                        />
                    ))}
            </div>
        </div>
    );
}

export default function AgentPage({ usersData, isLoading }) {
    const { profile } = useAuth();
    const images = [
        "/images/npp.png",
        "/images/npp1.png",
        "/images/npp2.png",
        "/images/npp3.png",
        "/images/npp4.png",
        "/images/npp5.png",
    ];

    return (
        <div className="mt-12 mb-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full lg:w-9/12">
                        <div className={`py-6 rounded-[4px] shadow blue-bg`}>
                            <h5 className={`text-center mb-2 gold-text`}>
                                Danh Hiệu Hiện Tại
                            </h5>

                            {isLoading ? (
                                <div className="flex justify-center items-center mt-2 flex-wrap gap-2 px-5">
                                    {Array.from(new Array(6)).map((_, idx) => (
                                        <Skeleton
                                            key={idx}
                                            variant="rectangular"
                                            width={80}
                                            height={80}
                                            className="rounded"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center mt-2 flex-wrap gap-2 px-5">
                                    {images.map((src, index) => (
                                        <div
                                            key={index}
                                            className={`relative w-[80px] h-[80px] rounded ${
                                                profile?.agent_level === index
                                                    ? styles.grayBg
                                                    : ""
                                            }`}
                                        >
                                            <Image
                                                src={src}
                                                alt={`npp-${index}`}
                                                fill
                                                className="object-contain rounded p-1"
                                                sizes="80px"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="border rounded-[4px] p-2">
                            {isLoading ? (
                                <div className="space-y-3">
                                    {Array.from(new Array(3)).map((_, idx) => (
                                        <Skeleton
                                            key={idx}
                                            variant="rectangular"
                                            width="100%"
                                            height={67}
                                        />
                                    ))}
                                </div>
                            ) : (
                                usersData
                                    ?.flatMap((item) => item.referrals || [])
                                    .map((child) => (
                                        <AccordionItem
                                            key={child.id}
                                            item={child}
                                        />
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
