import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

import Container from "@/components/Common/Container";

import styles from "./Breadcrumb.module.scss";

function Breadcrumb({ data = [], className }) {
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <Container maxWidth="var(--container-width)">
            {data.length > 1 && (
                <div
                    className={classNames(styles.breadcrumbWrapper, className)}
                >
                    {data.map((item, index) => {
                        const activeLink =
                            pathname === item.link ||
                            pathname === item.link?.pathname;
                        const Component = activeLink
                            ? "div"
                            : (props) => <Link href={item.link} {...props} />;
                        return (
                            <Component key={index}>
                                <>
                                    {index !== 0 ? (
                                        <span
                                            className={
                                                styles.breadcrumbSeperator
                                            }
                                        >
                                            /
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                    <span
                                        className={classNames(styles.link, {
                                            [styles.active]: activeLink,
                                        })}
                                    >
                                        {item.label}
                                    </span>
                                </>
                            </Component>
                        );
                    })}
                </div>
            )}
        </Container>
    );
}

export default Breadcrumb;
