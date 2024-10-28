import { NextResponse } from 'next/server';

export const errorHandler = (handler) => async (req) => {
    try {
        return await handler(req);
    } catch (error) {
        const statusCode = error.status || 500;
        const message = error.message || 'Internal Server Error';
    
        return NextResponse.json({ message: message }, { status: statusCode });
    }
};