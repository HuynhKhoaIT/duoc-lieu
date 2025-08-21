const nextConfig = {
    reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        // ignoreDuringBuilds: true,
    },
    images: {
        domains: [ "datlichbaoduong.vcos.cloudstorage.com.vn" ],
    },
    webpack: (config) => {
        const rules = config.module.rules
            .find((rule) => typeof rule.oneOf === "object")
            .oneOf.filter((rule) => Array.isArray(rule.use));
        rules.forEach((rule) => {
            rule.use.forEach((moduleLoader) => {
                if (
                    moduleLoader.loader !== undefined &&
                    moduleLoader.loader.includes("css-loader") &&
                    typeof moduleLoader.options.modules === "object"
                ) {
                    moduleLoader.options = {
                        ...moduleLoader.options,
                        modules: {
                            ...moduleLoader.options.modules,
                            // This is where we allow camelCase class names
                            exportLocalsConvention: "camelCase",
                        },
                    };
                }
            });
        });

        const fileSvgLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg"),
        );

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileSvgLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: /\.(js|jsx)?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: [
                    { loader: "@svgr/webpack", options: { dimensions: false } },
                ],
            },
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileSvgLoaderRule.exclude = /\.svg$/i;
        return config;
    },
};

export default nextConfig;
