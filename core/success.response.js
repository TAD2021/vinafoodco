'use strict';

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    CREATED: 'Created',
    OK: 'Success',
}

export class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}}){
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(NextResponse, headers = {}){
        return NextResponse.json(this, { status: this.status });
    }
    
}

export class OK extends SuccessResponse {
    constructor({ message, metadata}){
        super({message, metadata})
    }
}

export class CREATED extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata}) {
        super({message, statusCode, reasonStatusCode, metadata})
    }
}

