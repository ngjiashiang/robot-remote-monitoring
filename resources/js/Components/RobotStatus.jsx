import RobotDataFieldParser from "@/Components/RobotDataFieldParser";

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

    return (
        <>
            {
                Object.entries(robotStatus).map(([key, value], index) => {
                    if(!statusToHide.includes(key) && (showNullStatuses || value != null)) {
                        if(key == "data" && value != null) {
                            return <RobotDataFieldParser  key={robotStatus.robot_id + "-" + key} showDataKey={true} data={value}/>
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