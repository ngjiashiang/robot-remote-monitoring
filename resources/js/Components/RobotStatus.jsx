export default function RobotStatus({ 
    robotStatus,
    showNullStatuses = false,
    statusToHide = ['id', 'robot_id', 'created_at']
}) {
    return (
        <>
            {
                robotStatus == null
                ?
                    <div className="text-red-500">Robot has not updated any status yet.</div>
                :
                // if robot status is not null, map the robotStatus object with
                Object.entries(robotStatus).map(([key, value]) => {
                    if (!statusToHide.includes(key) && (showNullStatuses || value != null)) {
                        return (
                            <div key={key}>
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