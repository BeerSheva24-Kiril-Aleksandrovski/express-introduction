import { createError } from "../errors/errors.js";
import JwtUtils from "../security/JwtUtils.js";
import accountingService from "../service/AccountService.js";
import bcrypt from "bcrypt";

const BEARER = "Bearer ";
const BASIC = "Basic ";

export function authenticate(paths) {
    return (req, res, next) => {
        const authHeader = req.header("Authorization");
        if (authHeader) {
            if (authHeader.startsWith(BEARER)) {
                jwtAuthentication(req, authHeader);
            } else if (authHeader.startsWith(BASIC)) {
                basicAuthentication(req, authHeader);
            }
        }
        next();
    };
}

function jwtAuthentication(req, authHeader) {
    const token = authHeader.substring(BEARER.length);
    try {
        const payload = JwtUtils.verifyJwt(token);
        req.user = payload.sub;
        req.role = payload.role;
        req.authType = "jwt";
    } catch (error) { }
}

function basicAuthentication(req, authHeader) {
    const usernamePassword64 = authHeader.substring(BASIC.length)
    const usernamePassword = Buffer.from(usernamePassword64, 'base64').toString('utf-8');
    const usernamePasswordArr = usernamePassword.split(":");
    try {
        if (usernamePasswordArr[0] === process.env.ADMIN_USERNAME) {
            if (usernamePasswordArr[1] === process.env.ADMIN_USERNAME) {
                req.user = process.env.ADMIN_USERNAME;
                req.role = "";
                req.authType = 'basic';
            }
        } else {
            const serviceAccount = accountingService.getAccount(usernamePasswordArr[0]);
            accountingService.checkLogin(serviceAccount,usernamePasswordArr[1])
            req.user = usernamePasswordArr[0];
            req.role = serviceAccount.role;
            req.authType = 'basic';
        }
        
    } catch (error) {

    }
}




export function auth(paths) {
    return (req, res, next) => {
        const { authentication, authorization } = paths[req.method];
        if (!authorization) {
            throw createError(500, "Security configuration is not provided");
        }
        if (authentication(req)) {
            if (req.authType !== authentication(req)) {
                throw createError(401, "no required authentication");
            }
            if (!authorization(req)) {
                throw createError(403, "")
            }
        }
        next();
    }
}
