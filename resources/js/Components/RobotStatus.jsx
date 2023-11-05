export default function RobotStatus({ 
    robotStatus,
    showNullStatuses = false,
    statusToHide = ['id', 'robot_id', 'created_at']
}) {
    return (
        <>
            {
                Object.entries(robotStatus).map(([key, value], index) => {
                    if (!statusToHide.includes(key) && (showNullStatuses || value != null)) {
                        return (
                            <div key={robotStatus.robot_id + "-" + key}>
                                <strong>{key}:</strong> {value}
                            </div>
                        );
                    }
                    return null; // Skip this entry
                })
                
            }
        </>
    );
};