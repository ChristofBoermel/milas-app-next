import { i18n } from 'next-i18next';

/** @type {import('next').NextConfig} */

const nextConfig = {
    i18n: {
        locales: ['en-EN', 'de-DE', 'pl-PL'],
        defaultLocale: 'en-EN',
    },
};

export default nextConfig;
