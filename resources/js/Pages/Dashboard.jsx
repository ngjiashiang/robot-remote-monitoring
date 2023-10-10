import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RobotStatus from '@/Components/RobotStatus'

export default function Dashboard(props) {
    console.log(props.robots)
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Robot Dashboard</h2>}
        >
            <Head title="Robot Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">           
                    {
                        props.robots.map((robot) => (
                            <div className="w-full flex justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6 p-6">
                                <div className="hidden md:block w-1/5 my-auto">
                                    {robot.id}
                                </div>
                                <div className="w-1/5 my-auto">
                                    {robot.name}
                                </div>
                                <div className="w-3/5 my-auto">
                                    <RobotStatus showNullStatuses robotStatus={robot.latest_status} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
