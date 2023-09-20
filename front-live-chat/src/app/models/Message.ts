import { MessageTypeEnum } from "./MessageTypeEnum";

export class Message {
    public userName: string;
    public content: string;
    public type: MessageTypeEnum;

    constructor(userName: string, content: string, type: MessageTypeEnum) {
        this.userName = userName;
        this.content = content;
        this.type = type;
    }
}