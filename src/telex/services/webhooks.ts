import { Request, Response } from "express";


export async function handleTelexWebhook(req: Request, res: Response) {
    const data = req.body;

    console.log('data from telex:- ', data);
    
    res.status(200).json({message: "Webhook received"});
}
