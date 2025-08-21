import { Fragment } from 'react';
import Head from 'next/head';

import { metaDefaults } from '@/constants';
import { cleanObject } from '@/utils';

import { useDevices } from './DevicesProvider';

const RenderContext = ({ desktop, mobile, metadata, ...props }) => {
 
    const { title, description, image } = {
        ...metaDefaults,
        ...cleanObject(metadata),
    };

    const device = useDevices();
    const isMobile = device;
    const Component = isMobile ? mobile?.device : desktop?.device;
    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
            </Head>
            <Component {...props} />
        </Fragment>
    );
};

export default RenderContext;
