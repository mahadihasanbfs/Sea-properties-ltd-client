import React from 'react';
import { Helmet } from 'react-helmet';

const MetaHelmet = ({ title, description, ogTitle, ogDescription, ogImage }) => {
    return (
        <Helmet>
            <title>{title} || SEA Properties Ltd.</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:image" content={ogImage} />
            {/* You can add more meta tags here if needed */}
        </Helmet>
    );
};

export default MetaHelmet;