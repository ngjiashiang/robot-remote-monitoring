import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
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
                            <div className="w-full flex bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6 p-6">
                                <div className="w-1/5 my-auto">
                                    {robot.id}
                                </div>
                                <div className="w-1/5 my-auto">
                                    {robot.name}
                                </div>
                                <div className="my-auto">
                                    <div>
                                        Status: {robot.status}
                                    </div>
                                    <div>
                                        Battery level: {robot.battery_level}
                                    </div>
                                    <div>
                                        Scheduled maintainance at: {robot.scheduled_maintainance_at}
                                    </div>
                                    <div>
                                        Error code: {robot.error_code}
                                    </div>
                                    <div>
                                        Updated at: {robot.updated_at}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
