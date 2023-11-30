import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CopyBlock, atomOneDark} from 'react-code-blocks';

export default function Dashboard(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Documentation</h2>}
        >
            <Head title="Documentation" />

            <div className="py-12">
                <article className="prose max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2>Robot Intergration</h2>
                    <ol>
                        <li>
                            Add robots at <Link href='/admin/manage-robots'>/admin/manage-robots</Link>.
                        </li>
                        <li>
                            <p>Obtain the ID of robot added as shown in <Link href='/admin/manage-robots'>/admin/manage-robots</Link> and the private key of the robot in the success message.</p>
                            <p>The success message should look like the below:</p>
                            <div className="mt-6 text-center bg-green-100 w-full p-6 rounded-lg border-2 border-green-300">
                                <div className="text-2xl font-bold">
                                    <span className='p-1 rounded-lg italic opacity-50 bg-gray-700 text-white'>name of robot</span> added succesfully
                                </div>
                                <div className="mt-4">
                                    Credentials generated:
                                </div>
                                <div>
                                    Private key: <span className='p-1 rounded-lg italic opacity-50 bg-gray-700 text-white'>private key of robot created</span>
                                </div>
                                <div className="mt-2 text-md italic text-gray-700">
                                    *This credential can only be shown once, please copy it and store it securely.
                                </div>
                            </div>
                        </li>
                        <li>
                            Send POST API request to <span className='highlighted'>{route('welcome')}/api/robot</span> from the robot you have added.
                        </li>
                        <li>
                            <p>Your request body should look like: </p>
                            <div className='not-prose'>
{/* Please leave it, this is not an indentation issue */}
<CopyBlock
    language={'js'}
    theme={atomOneDark}
    showLineNumbers
    codeBlock
    text='{
    "id": 1, // replace with ID of your robot
    "private_key": "aTdB6pIz0UzDyExN6xYP", // replace with private key of your robot
    "current_task": "121113", // replace with current task of your robot
    "error_code": "69a12", // replace with error task of your robot
    "data": "{\"Eaten already\" : \"221\",\"Hungry\" : 1, \"eaten how much\":111}", // replace with dynamic status of your robot
    "battery_level": 18 // replace with battery level of your robot
}
// sequence of these fields does not matter, no worries!'
/>
                            </div>
                        </li>
                    </ol>
                    <h2>The request body</h2>
                    <div>
                        Mandatory fields:
                        <ol>
                            <li>
                                <span className='highlighted'>id</span> : of type integer
                            </li>
                            <li>
                                <span className='highlighted'>private_key</span> : of type string
                            </li>
                        </ol>
                    </div>
                    <div>
                        Optional fields: 
                        <ol>
                            <li>
                                <span className='highlighted'>current_task</span> : of type string
                            </li>
                            <li>
                                <span className='highlighted'>error_code</span> : of type string
                            </li>
                            <li>
                                <span className='highlighted'>data</span> : of type string/JSON string (JSON encoded as string)
                            </li>
                            <li>
                                <span className='highlighted'>battery_level</span> : of type integer
                            </li>
                        </ol>
                    </div>
                    <h3>Regarding the <span className='highlighted'>data</span> field</h3>
                    <p>
                        This field is to display dynamic data of a robot for flexibility purposes.
                        You can include a simple string for this field. For example, "data": "Hello world", or
                        For more advanced uses cases where you need to include custom metrics from your robots,
                        the metrics and thier values should be passed into the data field as a JSON string.
                    </p>
                    <h2>Examples:</h2>
                    <div className='not-prose'>
                        <p className='font-bold'>Python</p>
<CopyBlock
    language={'python'}
    theme={atomOneDark}
    showLineNumbers
    codeBlock
    text='import requests

url = "http://10.5.51.188/api/robot"
data = {
    "id": 1,
    "private_key": "aTdB6pIz0UzDyExN6xYP",
    "current_task": "121113",
    "error_code": "69a12",
    "data": "{\"Eaten already\" : \"221\",\"Hungry\" : 1, \"eaten how much\":111}",
    "battery_level": 18
}

response = requests.post(url, json=data)
print(response.status_code)
print(response.text)
'
/>
                        <p className='font-bold mt-4'>JavaScript</p>
<CopyBlock
    language={'js'}
    theme={atomOneDark}
    showLineNumbers
    codeBlock
    text='const url = "http://10.5.51.188/api/robot";
const data = {
    id: 1,
    private_key: "aTdB6pIz0UzDyExN6xYP",
    current_task: "121113",
    error_code: "69a12",
    data: "{\"Eaten already\" : \"221\",\"Hungry\" : 1, \"eaten how much\":111}",
    battery_level: 18
};

fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: data,
})
'
/>
                    </div>
                </article>
            </div>
        </AuthenticatedLayout>
    );
}
