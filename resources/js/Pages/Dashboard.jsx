import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RobotStatus from '@/Components/RobotStatus'
import { useState, useEffect } from 'react';
import { isConnected, usePrivateChannel } from '@/Hooks/useWebSockets'
import { router } from '@inertiajs/react'

export default function Dashboard(props) {
    const [robotStatuses, setRobotStatuses] = useState(props.robots);
    const [modifiedRow, setModifiedRow] = useState(null);

    try {
        var robotUpdates = usePrivateChannel('robots-status', 'RobotStatusUpdated')
        var wsConnection = isConnected();
    } catch (error) {
        console.error(error)
    }
    
    useEffect(() => {
        if(robotUpdates) {
            console.log('websockets fireed')
            console.log(robotUpdates)
            updateRobotStatus(robotUpdates.robot_data);
        }
    }, [robotUpdates]);

    setTimeout(() => {
        if(! wsConnection) {
            // router.reload({ only: ['robots'], hideProgress: true })
            // setRobotStatuses(props.robots)
        }
    }, 10000);

    useEffect(() => {
        if(!wsConnection) {
            console.log('no ws connection')
        }
        console.log('got ws connection')
    }, [wsConnection]);

    const updateRobotStatus = (newStatus) => {
        setRobotStatuses((robotStatuses) => {
            const robotDataToBeUpdated = [...robotStatuses];
            const index = robotDataToBeUpdated.findIndex(data => data.id === newStatus.latest_status.robot_id);
            console.log(index)
            if (index !== -1) {
                console.log('bbbbbbbbbbbbb')
                robotDataToBeUpdated[index] = newStatus;
                setModifiedRow(index);
            } else if (newStatus.latest_status.robot_id) {
                console.log('aaaaaaaaaaaaaaa')
                robotDataToBeUpdated.unshift(newStatus);
                setModifiedRow(0);
            }
            return robotDataToBeUpdated;
        });
        setTimeout(() => {
            setModifiedRow(null);
        }, 2000);
    };

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
                        robotStatuses.map((robot, index) => (
                            <div key={robot.id} className={`w-full flex justify-between overflow-hidden shadow-sm sm:rounded-lg mb-6 p-6 transition-colors duration-[2000ms] ease-in-out ${modifiedRow === index ? 'bg-green-500' : 'bg-white'}`}>
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
