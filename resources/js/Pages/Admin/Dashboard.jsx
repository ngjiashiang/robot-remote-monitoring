import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

export default function Dashboard(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link href="/admin/manage-users" className="block mt-6 hover:bg-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-lg hover:text-blue-700 text-gray-900">
                        <div className="flex justify-between p-6">
                            <div>Manage Users</div>
                            <BsFillArrowRightCircleFill size={20} className='my-auto'/>
                        </div>
                    </Link>
                    <Link href="/admin/manage-robots" className="block mt-6 hover:bg-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-lg hover:text-blue-700 text-gray-900">
                        <div className="flex justify-between p-6">
                            <div>Manage Robots</div>
                            <BsFillArrowRightCircleFill size={20} className='my-auto'/>
                        </div>
                    </Link>
                    <Link href="" className="block mt-6 hover:bg-gray-200 bg-white overflow-hidden shadow-sm sm:rounded-lg hover:text-blue-700 text-gray-900">
                        <div className="flex justify-between p-6">
                            <div>Documentation</div>
                            <BsFillArrowRightCircleFill size={20} className='my-auto'/>
                        </div>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
