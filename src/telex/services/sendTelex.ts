import axios from "axios";
import { appEmitter } from "../../global/events";
import { getDatabaseData } from "../../notion/services/db";
import { formatOutputMessage } from "../../notion/services/formatData";
import { TELEX_EVENTS } from "../events";

const TELEX_WEBHOOK_URL = process.env.TELEX_TARGET_URL;

export const sendTelexUpdate = async () => {
    try {
const tasks = await getDatabaseData();

const formattedTasks = await formatOutputMessage(tasks);

console.log("formattedTasks:- ", formattedTasks);

const payload = {
    event_name: "task_updates",
    message: formattedTasks,
    status: "success",
    username: "Khaybee",
}

const response = await axios.post(TELEX_WEBHOOK_URL, payload, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

console.log("response:- ",  response.data);

return true;

    } catch (error) {
        console.error('Error sending telex update:', error);
        throw error;
    }
}

appEmitter.on(TELEX_EVENTS.TELEX_WEBHOOK, async () => {
    try {
        console.log("Sending telex update");

        await sendTelexUpdate();
        
        console.log('Telex update sent successfully');

    } catch (error) {
        console.error('Failed to send telex update:', error);
        // Optionally emit an error event if you want to handle failures elsewhere
        appEmitter.emit('telexError', error);
    }
});
