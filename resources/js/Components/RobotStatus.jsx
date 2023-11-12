export default function RobotStatus({ 
    robotStatus,
    showNullStatuses = false,
    statusToHide = ['id', 'robot_id', 'created_at']
}) {
    const robotStatusTranslation = {
        "battery_level": "Battery level",
        "current_task": "Current task",
        "error_code": "Error code",
        "data": "Data",
        "updated_at": "Updated at"
    }

    function isJSONString(str) {
        try {
            let json = JSON.parse(str);
            if (typeof json === 'object' && json !== null) {
                return {
                    data: json,
                    valid_json: true
                };
            } else {
                throw "not a json string"
            }
        } catch (error) {
            console.log("not json string")
            return {
                data: str,
                valid_json: false
            };
        }
    }

    return (
        <>
            {
                Object.entries(robotStatus).map(([key, value], index) => {
                    if(!statusToHide.includes(key) && (showNullStatuses || value != null)) {
                        if(key == "data" && value != null) {
                            let temp = isJSONString(value)
                            return temp.valid_json ? Object.entries(temp.data).map(([dataKey, dataValue], dataIndex) => {
                                return <div key={robotStatus.robot_id + "-" + key + "-" + dataKey + "-" + dataIndex}>
                                    <strong>{dataKey}:</strong>  {dataValue}
                                </div>
                            }) :
                            <div key={robotStatus.robot_id + "-" + key}>
                                <strong>Data:</strong> {value}
                            </div>
                        }
                        return (
                            <div key={robotStatus.robot_id + "-" + key}>
                                <strong>{robotStatusTranslation[key]}:</strong> {key == "updated_at" ? new Date(value).toString() : value}
                            </div>
                        );
                    }
                    return null; // Skip this entry
                })
                
            }
        </>
    );
};