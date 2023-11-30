import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RobotStatus from '@/Components/RobotStatus'
import { useState, useEffect } from 'react';
import { isConnected, usePrivateChannel } from '@/Hooks/useWebSockets';
import Pagination from '@/Components/Pagination';
import { router } from '@inertiajs/react';
import WebSocketsUnavailableAlert from '@/Components/WebSocketsUnavailableAlert';

export default function Dashboard(props) {
    console.log(props.robots.data);
    const [robotStatuses, setRobotStatuses] = useState(props.robots.data);
    const [modifiedRow, setModifiedRow] = useState(null);
    const [queriedRobotName, setQueriedRobotName] = useState(props.queried_name)

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
                router.visit(window.location, { preserveScroll: true });
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
            const index = robotDataToBeUpdated.findIndex(data => data.id === newStatus.robot_id);
            console.log(index)
            console.log(robotDataToBeUpdated[index])
            console.log(newStatus)
            if (index !== -1) {
                console.log('bbbbbbbbbbbbb')
                robotDataToBeUpdated[index].latest_status = newStatus;
                setModifiedRow(index);
            }

            return robotDataToBeUpdated;
        });
        setTimeout(() => {
            setModifiedRow(null);
        }, 2000);
    };

    function handleChange(e) {
        setQueriedRobotName(e.target.value);
    }

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
                        <form action={route('dashboard')} method="GET" className="flex space-x-2">
                            <input name="name" value={queriedRobotName} onChange={handleChange} type="text" placeholder="Search by robot name" className="rounded-lg"/>
                            <button className='border border-black bg-white rounded-lg p-2 hover:bg-blue-300 focus:bg-blue-300'>🔍</button>
                        </form>
                    </div>
                    {!wsConnection &&
                        <WebSocketsUnavailableAlert />
                    }
                    <div className="bg-black text-white w-full flex justify-between overflow-hidden shadow-sm sm:rounded-t-lg mb-4 px-6 py-2">
                        <div className="hidden md:block w-1/5 my-auto">
                            ID
                        </div>
                        <div className="w-1/5 my-auto">
                            NAME
                        </div>
                        <div className="w-3/5 my-auto">
                            STATUSES
                        </div>
                    </div>
                    {
                        robotStatuses.map((robot, index) => (
                            <a href={"/robot/" + robot.id} key={robot.id} className={`w-full flex justify-between overflow-hidden shadow-sm sm:rounded-lg mb-6 p-6 hover:bg-black hover:text-white ${modifiedRow === index ? 'transition-colors duration-[2000ms] ease-in-out bg-green-500' : 'bg-white'}`}>
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
                            </a>
                        ))
                    }
                    <Pagination pages={props.robots.links}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
