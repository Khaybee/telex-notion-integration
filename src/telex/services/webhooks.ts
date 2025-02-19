import { Request, Response } from "express";
import { appEmitter } from "../../global/events";
import { TELEX_EVENTS } from "../events";

export async function handleTelexWebhook(req: Request, res: Response) {
    const data = req.body;

    console.log('data from telex:- ', data);
    
    appEmitter.emit(TELEX_EVENTS.TELEX_WEBHOOK);
    
    res.status(200).json({message: "Webhook received"});

}
