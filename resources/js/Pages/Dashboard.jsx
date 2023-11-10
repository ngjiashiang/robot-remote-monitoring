import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RobotStatus from '@/Components/RobotStatus'
import { useState, useEffect } from 'react';
import { isConnected, usePrivateChannel } from '@/Hooks/useWebSockets'
import Pagination from '@/Components/Pagination'
import { router } from '@inertiajs/react'
import Alert from '@mui/material/Alert';

export default function Dashboard(props) {
    console.log(props.robots.data);
    const [robotStatuses, setRobotStatuses] = useState(props.robots.data);
    const [modifiedRow, setModifiedRow] = useState(null);

    try {
        var robotUpdates = usePrivateChannel('robots-status', 'RobotStatusUpdated');
        var wsConnection = isConnected();
    } catch (error) {
        console.error(error);
    }
    
    useEffect(() => {
        if(robotUpdates) {
            console.log('websockets fireed');
            console.log(robotUpdates);
            updateRobotStatus(robotUpdates.robot_data);
        }
    }, [robotUpdates]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!wsConnection) {
                console.log('No ws connection');
                router.visit(window.location);
                // setRobotStatuses(props.robots.data);
                console.log('Polling');
            } else {
                console.log('Got ws connection');
            }
        }, 10000);
      
        return () => {
          clearInterval(intervalId);
        }
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
                    <div className="w-full flex justify-end mb-4">
                        <div className="flex space-x-2">
                            <input type="text" placeholder="Search by robot name" className="rounded-lg"/>
                            <button className='border border-black bg-white rounded-lg p-2 hover:bg-blue-300 focus:bg-blue-300'>🔍</button>
                        </div>
                    </div>
                    {!wsConnection &&
                        <div className="mb-4">
                            <Alert severity="warning">Websockets connection & realtime updates are unavailable, please contact admin. Page is reloading on a 10 second interval.</Alert>
                        </div>
                    }
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
                                    { 
                                        robot.latest_status ?
                                            <RobotStatus showNullStatuses robotStatus={robot.latest_status} />
                                        :
                                        <div className="text-red-500">Robot has not updated any status yet.</div>
                                    }
                                    
                                </div>
                            </div>
                        ))
                    }
                    <Pagination pages={props.robots.links}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
