import Alert from '@mui/material/Alert';

export default function WebSocketsUnavailableAlert() {
    return (
        <div className="mb-4">
            <Alert severity="warning">Websockets connection & realtime updates are unavailable, please contact admin. Page is reloading on a 10 second interval.</Alert>
        </div>
    );
}
