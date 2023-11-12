import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head } from '@inertiajs/react'

export default function Guest({ children }) {
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-32x32.png" />
            </Head>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className='mb-4 text-2xl font-bold'>
                    watchBot
                </div>
                <div>
                    <a href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </a>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </>
    );
}
