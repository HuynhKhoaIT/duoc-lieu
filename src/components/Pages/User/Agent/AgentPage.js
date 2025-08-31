"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

import styles from "./ContactForm.module.scss";
import { maskPhone } from "@/utils";

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

            {/* Collapse with animation */}
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

export default function AgentPage({usersData}) {
    const data = [
        {
            id: "1",
            title: "Huỳnh Khoa | 086****090",
            children: [
                {
                    id: "1-1",
                    title: "Văn Tài dev | 036****366",
                    children: [
                        {
                            id: "1-1-1",
                            title: "Khoa dev | 086****091",
                            children: [
                                {
                                    id: "1-1-1-1",
                                    title: "Level 4 | 098****123",
                                    children: [
                                        {
                                            id: "1-1-1-1-1",
                                            title: "Level 5 | 097****456",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="mt-12 mb-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full lg:w-9/12">
                        {/* --- Danh hiệu --- */}
                        <div className={`py-6 rounded-[4px] shadow blue-bg`}>
                            <h5 className={`text-center mb-2 gold-text`}>
                                Danh Hiệu Hiện Tại
                            </h5>
                            <div className="flex justify-center items-center mt-2 flex-wrap gap-2 px-5">
                                <img
                                    className={`p-1 rounded ${styles.grayBg}`}
                                    src="/images/npp.png"
                                    width="80"
                                />
                                <img
                                    className="p-1"
                                    src="/images/npp1.png"
                                    width="80"
                                />
                                <img
                                    className="p-1"
                                    src="/images/npp2.png"
                                    width="80"
                                />
                                <img
                                    className="p-1"
                                    src="/images/npp3.png"
                                    width="80"
                                />
                                <img
                                    className="p-1"
                                    src="/images/npp4.png"
                                    width="80"
                                />
                                <img
                                    className="p-1"
                                    src="/images/npp5.png"
                                    width="80"
                                />
                            </div>
                        </div>

                        {/* --- Accordion --- */}
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
