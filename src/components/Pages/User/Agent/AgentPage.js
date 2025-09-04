"use client";
import { useState } from "react";

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
                {item.name} | {maskPhone(item.phone_number)}
            </button>

            <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out pl-4`}
                style={{ maxHeight: open ? "200px" : "0px" }}
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

export default function AgentPage({ usersData }) {
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
                            <div className="flex justify-center items-center mt-2 flex-wrap gap-2 px-5">
                                {images.map((src, index) => (
                                    <img
                                        key={index}
                                        className={`p-1 rounded ${profile?.agent_level === index ? styles.grayBg : ""}`}
                                        src={src}
                                        width="80"
                                        alt={`npp-${index}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="border rounded-[4px] p-2">
                            {usersData?.map((item) => (
                                <AccordionItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
