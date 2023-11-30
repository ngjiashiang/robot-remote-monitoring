import { Link, Head } from '@inertiajs/react';
import { TypeAnimation } from 'react-type-animation';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-blue-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {props.auth.user ? (
                        <a
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm"
                        >
                            Dashboard
                        </a>
                    ) : (
                        <>
                            <a
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm"
                            >
                                Log in
                            </a>
                        </>
                    )}
                </div>
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="">
                        <div>
                            <span className='text-3xl mr-4'>Robot monitoring now</span>
                            <TypeAnimation
                                className='text-blue-500'
                                preRenderFirstString={true}
                                sequence={[
                                500,
                                'REMOTE', // initially rendered starting point
                                1000,
                                'SEAMLESS',
                                1000,
                                'ENHANCED',
                                1000,
                                'SEAMLESS',
                                1000,
                                'REIMAGINED',
                                1000,
                                'AT YOUR FINGERTIPS',
                                1000,
                                'BRILLIANT',
                                1000,
                                'UNPARALLELED',
                                500,
                                ]}
                                speed={50}
                                style={{ fontSize: '2em' }}
                                repeat={Infinity}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
