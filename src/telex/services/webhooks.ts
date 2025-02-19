import { Request, Response } from "express";
import { appEmitter } from "../../global/events";
import { TELEX_EVENTS } from "../events";
import { sendTelexUpdate } from "./sendTelex";

appEmitter.on(TELEX_EVENTS.TELEX_WEBHOOK, async () => {
    try {
        await sendTelexUpdate();
        console.log('Telex update sent successfully');

    } catch (error) {
        console.error('Failed to send telex update:', error);
    }
});

export async function handleTelexWebhook(req: Request, res: Response) {
    try {

        const { channel_id, return_url } = req.body;

        console.log('data from telex:- ', req.body);

	if (!channel_id || !return_url) {
		res.status(404).json({
			status: 'error',
			message: 'channel_id and return_url are required',
		});
	}

        const data = req.body;

        appEmitter.emit(TELEX_EVENTS.TELEX_WEBHOOK, data);
        
        res.status(200).json({ message: "Webhook received" });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
