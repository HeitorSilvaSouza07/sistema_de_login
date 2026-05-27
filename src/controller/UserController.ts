import { User } from '../entitie/User';
import { Connection } from '../lib/database';
import { Request, Response } from 'express';

export class UserController{
    static async createUser(){
        try{

        }catch(error: any){

        }
    }

    static async login(req: Request, res: Response){
        try{

            const { passwordUser, emailUser } = req.body;

        }catch(error: any){
            
        }
    }
}