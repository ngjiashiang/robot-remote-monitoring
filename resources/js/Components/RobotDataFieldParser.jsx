export default function RobotDataFieldParser({ 
    data,
    keyName,
    showDataKey
}) {
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

    const temp = isJSONString(data)

    return (
        <>
            {
                temp.valid_json ? Object.entries(temp.data).map(([dataKey, dataValue], dataIndex) => {
                    return (
                        <div key={dataKey + "-" + dataIndex}>
                            <strong>{dataKey}:</strong>  {dataValue}
                        </div>
                    )
                }) :
                <div>
                    {showDataKey && <strong>Data:</strong>} {temp.data}
                </div>
            }
        </>
    );
};