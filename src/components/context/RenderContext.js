import { Fragment } from "react";
import Head from "next/head";

import { metaDefaults } from "@/constants";
import { cleanObject } from "@/utils";

const RenderContext = ({ metadata, children }) => {
    const {
        title = "TamPhucThanh",
        description = "Dược Liệu Xanh An Lành Cho Sức Khỏe",
        image = "/images/logo.png",
        url,
        type = "website",
        siteName = "My Website",
        publishedTime,
        modifiedTime,
        author,
        section,
        tags,
    } = {
        ...metaDefaults,
        ...cleanObject(metadata),
    };


    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={url} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                {/* Open Graph */}
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                {image && <meta property="og:image" content={image} />}
                {url && <meta property="og:url" content={url} />}
                <meta property="og:site_name" content={siteName} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                {image && <meta name="twitter:image" content={image} />}

                {/* Article (chỉ khi là news/blog) */}
                {publishedTime && (
                    <meta
                        property="article:published_time"
                        content={publishedTime}
                    />
                )}
                {modifiedTime && (
                    <meta
                        property="article:modified_time"
                        content={modifiedTime}
                    />
                )}
                {author && <meta property="article:author" content={author} />}
                {section && (
                    <meta property="article:section" content={section} />
                )}
                {tags &&
                    tags.map((tag, i) => (
                        <meta key={i} property="article:tag" content={tag} />
                    ))}
            </Head>
            {children}
        </Fragment>
    );
};

export default RenderContext;
