import { Request, Response } from "express";
import { appEmitter } from "../../global/events";
import { TELEX_EVENTS } from "../events";

export async function handleTelexWebhook(req: Request, res: Response) {
    try {
        const data = req.body;
        console.log('data from telex:- ', data);
        
        // Pass the data to the event listener
        appEmitter.emit(TELEX_EVENTS.TELEX_WEBHOOK, data);
        
        res.status(200).json({ message: "Webhook received" });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
