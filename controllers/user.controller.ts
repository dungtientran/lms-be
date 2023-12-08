import { Request, Response, NextFunction } from "express";
import userModel, { IUSer } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsynError } from "../middleware/catchAsyncError";
import jwt from "jsonwebtoken";

// register user
interface IRegistrationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const registrationUser = CatchAsynError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const isEmailExist = await userModel.findOne({ email });

        if (isEmailExist) {
            return next(new ErrorHandler("Email already exist", 400));
        };

        const user: IRegistrationBody = {
            name,
            email,
            password
        };

        const activationToken = createActivationToken(user);

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
});


interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: Iuser) : IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign()
}