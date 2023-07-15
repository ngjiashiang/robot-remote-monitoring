import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PopupModal from '@/Components/PopupModal';
import { useState } from "react";
import { router, usePage } from '@inertiajs/react'

export default function ManageRobots(props) {
    const { flash } = usePage().props

    const [popupIsOpened, setPopupIsOpened] = useState(false);

    const openPopup = () => {
        setPopupIsOpened(true);
    }

    const [name, setName] = useState({
        name: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        router.post('/admin/add-robot', name)
        setPopupIsOpened(false)
    }

    const handleChange = (e) => {
        const value = e.target.value
        setName(
            {
                name: value
            }
        )
    }

    const deleteRobot = (id) => {
        if(confirm("This is an irreversible process. Click OK to proceed.") != true)
            return

        router.post('/admin/delete-robot', {
            'robot_id': id
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Robots
                </h2>
            }
        >
            <Head title="Manage Robots" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row-reverse">
                        <button onClick={openPopup} className="border border-2 border-black hover:bg-black hover:text-white bg-white p-4 rounded-lg w-full md:w-max">
                            Add robot
                        </button>
                    </div>
                    {(flash.message && (flash.message.event === "new_robot_added_successfully")) && 
                        <div className="mt-6 text-center bg-green-100 w-full p-6 rounded-lg border-2 border-green-300">
                            <div className="text-2xl font-bold">
                                {`${flash.message.name} added succesfully`}
                            </div>
                            <div className="mt-4">
                                Credentials generated:
                            </div>
                            <div>
                                {`Private key: ${flash.message.private_key}`}
                            </div>
                            <div className="mt-2 text-md italic text-gray-700">
                                *This credential can only be shown once, please copy it and store it securely.
                            </div>
                        </div>
                    }
                    <PopupModal isOpened={popupIsOpened} setPopupIsOpened={setPopupIsOpened}>
                        <div className="text-center w-full p-6">
                            <div className="font-bold text-xl mb-6">Add robot</div>
                            <form autoComplete="false" className="w-11/12 mx-auto max-w-sm flex-col space-y-6" onSubmit={handleSubmit}>
                                <div className="mx-auto flex justify-between">
                                    <label className="my-auto" htmlFor="name">Name:</label>
                                    <input type="name" required className="w-2/3 p-1 rounded-lg bg-gray-100 border-2 border-black" id="robot_name" onChange={handleChange} />
                                </div>
                                <div className="text-left italic text-sm text-gray-600">
                                    You only have to insert robot's name.<br />Private key will be generated and robot credential will be presented to you upon creation.
                                </div>
                                <button className="hover:bg-black hover:text-white cursor-pointer bg-white p-2 w-full rounded-lg border-2 border-black" type="submit">Submit</button>
                            </form>
                        </div>
                    </PopupModal>
                    <table className="mt-6 min-w-full bg-white shadow-sm sm:rounded-lg text-gray-900">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Id
                                </th>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Name
                                </th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Delete robot
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {props.robots.map((robot, index) => (
                                <tr className={index % 2 ? "bg-gray-200" : "bg-white"}>
                                    <td className="w-1/3 text-left py-3 px-4">{robot.id}</td>
                                    <td className="w-1/3 text-left py-3 px-4">{robot.name}</td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => deleteRobot(robot.id)} className="p-2 rounded-lg bg-red-200 text-red border-red-500">
                                            Delete robot
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
