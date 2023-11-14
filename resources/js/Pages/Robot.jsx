import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { isConnected, usePrivateChannel } from '@/Hooks/useWebSockets';
import { useState, useEffect } from 'react';
import WebSocketsUnavailableAlert from '@/Components/WebSocketsUnavailableAlert';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Robot(props) {
    console.log(props.statuses.data);
    const [updates, setUpdates] = useState([]);
    const [modified, setModified] = useState(false);
    const [statuses, setStatuses] = useState(props.statuses.data);

    if(props.statuses.current_page == 1) {
        try {
            var robotUpdates = usePrivateChannel('robot-' + props.robot.id + "-status", 'RobotStatusUpdated');
            var wsConnection = isConnected();
        } catch (error) {
            console.error(error);
        }
        
        useEffect(() => {
            if(robotUpdates) {
                console.log('websockets fireed');
                console.log(robotUpdates);
                if(updates.length > 2) {
                    window.location.replace(window.location)
                }
                updateRobotStatus(robotUpdates.robot_data.latest_status);
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
            setUpdates((prevUpdates) => [newStatus, ...prevUpdates]);
            setStatuses((prevStatuses) => [newStatus, ...prevStatuses])
            setModified(true)
            setTimeout(() => {
                setModified(false);
            }, 2000);
        };
    }

    const CustomTooltip = ({ active, payload }) => {
        if (!active) return null
        return (
            <div className='px-4 py-4 bg-white rounded-lg border-2 border-black'>
                <div>
                    { new Date(payload[0].payload.updated_at).toString() }
                </div>
                <div>
                    Battery level: { payload[0].value }
                </div>
            </div>
        )
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.robot.name}</h2>}
        >
            <Head title={props.robot.name} />
            {props.statuses.data.length > 0 ?
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            width={500}
                            height={300}
                            data={statuses}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis reversed dataKey="updated_at" tickFormatter={dateTime => new Date(dateTime).toString()}/>
                            <YAxis />
                            <Tooltip content={<CustomTooltip/>} />
                            <Bar dataKey="battery_level" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className='mt-4'>
                        {wsConnection === false && <WebSocketsUnavailableAlert />}
                    </div>
                    <div className='w-full hidden lg:flex flex-col lg:flex-row'>
                        <div className='w-full mb-2 px-2 lg:w-1/5'></div>
                        <div className='w-full lg:w-4/5 bg-black text-white uppercase flex flex-row rounded-t-lg mb-4 p-2'>
                            <div className='lg:w-1/6 px-2'>
                                <div>Battery level</div>
                            </div>
                            <div className='lg:w-1/6 px-2'>
                                <div>Current task</div>
                            </div>
                            <div className='lg:w-1/6 px-2'>
                                <div>Error code</div>
                            </div>
                            <div className='lg:w-1/2 px-2'>
                                <div>Data</div>
                            </div>
                        </div>
                    </div>
                    {updates &&
                        updates.map((update, index) => {
                            return(
                                <div key={update.updated_at} className='w-full flex flex-col lg:flex-row'>
                                    <div className='w-full mb-2 px-2 lg:w-1/5'>{new Date(update.updated_at).toString()}</div>
                                    <div className={`w-full lg:w-4/5 flex flex-col lg:flex-row shadow-sm sm:rounded-lg mb-6 p-2 transition-colors duration-[2000ms] ease-in-out ${modified && index == 0 ? 'bg-green-500' : 'bg-white'}`}>
                                        <div className='break-all lg:w-1/6 px-2'>
                                            <strong className='lg:hidden'>Battery level: </strong>
                                            {update.battery_level || "null"}
                                        </div>
                                        <div className='break-all lg:w-1/6 px-2'>
                                            <strong className='lg:hidden'>Current task: </strong>
                                            {update.current_task || "null"}
                                        </div>
                                        <div className='break-all lg:w-1/6 px-2'>
                                            <strong className='lg:hidden'>Error code: </strong>
                                            {update.error_code || "null"}
                                        </div>
                                        <div className='lg:w-1/2 px-2'>
                                            <strong className='lg:hidden'>Data: </strong>
                                            {update.data || "null"}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        props.statuses.data.map((status, index) => {
                            return(
                                <div key={status.updated_at} className='w-full flex flex-col lg:flex-row'>
                                    <div className='w-full mb-2 px-2 lg:w-1/5'>{new Date(status.updated_at).toString()}</div>
                                    <div className='w-full lg:w-4/5 bg-white flex flex-col lg:flex-row shadow-sm sm:rounded-lg mb-6 p-2'>
                                        <div className='break-all lg:w-1/6 px-2'>
                                            <strong className='lg:hidden'>Battery level: </strong>
                                            {status.battery_level || "null"}
                                        </div>
                                        <div className='break-all lg:w-1/6 px-2'>
                                            <strong className='lg:hidden'>Current task: </strong>
                                            {status.current_task || "null"}
                                        </div>
                                        <div className='break-all lg:w-1/6 px-2'>
                                            <strong className='lg:hidden'>Error code: </strong>
                                            {status.error_code || "null"}
                                        </div>
                                        <div className='lg:w-1/2 px-2'>
                                            <strong className='lg:hidden'>Data: </strong>
                                            {status.data || "null"}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Pagination pages={props.statuses.links}/>
                </div>
            :
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 text-red-500 text-lg">
                    Robot has not updated any statuses yet.
                </div>
            }
        </AuthenticatedLayout>
    );
}
