import { useForm } from '@inertiajs/react'

export default function RobotForm(props) {
    const { data, setData, post, processing, errors } = useForm({
        robot_name: '',
        private_key: '',
        robot_status: '',
    })
      
    function submit(e) {
        e.preventDefault()
        post('/robot')
    }

    return (
        <>
            <div>
                <form onSubmit={submit} className='w-11/12 md:w-1/2 justify-center h-screen mx-auto flex flex-col space-y-4'>
                    <input name="robot_name" type="text" value={data.robot_name} onChange={e => setData('robot_name', e.target.value)} placeholder='robot name'/>
                    <input name="private_key" type="text" value={data.private_key} onChange={e => setData('private_key', e.target.value)} placeholder='private key'/>
                    <input name="robot_status" type="text" value={data.robot_status} onChange={e => setData('robot_status', e.target.value)} placeholder='status: "offline"/"online"'/>
                    <button type="submit" className="p-4 bg-gray-400">Submit</button>
                </form>
            </div>
        </>
    );
}
