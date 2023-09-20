import * as signalR from '@microsoft/signalr';
import { EventEmitter } from '@angular/core';
import { Message } from '../models/Message';
import { MessageTypeEnum } from '../models/MessageTypeEnum';

export class LiveChatService {

    public onConnectionSuccessfully: EventEmitter<void>;
    public newMessageReceivedEvent: EventEmitter<Message>;
    public userEnteredEvent: EventEmitter<Message>;
    public userExitEvent: EventEmitter<Message>;

    private _hubConnection: signalR.HubConnection;
    private _currentUserName: string;

    constructor() {
        this.newMessageReceivedEvent = new EventEmitter<Message>();
        this.userEnteredEvent = new EventEmitter<Message>();
        this.userExitEvent = new EventEmitter<Message>();
        this.onConnectionSuccessfully = new EventEmitter();
        this._currentUserName = '';
    }

    public get CurrentUserName(): string {
        return this._currentUserName;
    }

    public initializeNewUserConnectionAsync(userName: string): Promise<void> {
        this._currentUserName = userName;
        this._hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Debug)
            .withUrl('https://localhost:7136/liveChatHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

        this.assignNewMessageReceived();
        this.assignOnUserEnterChatAsync();
        this.assignOnUserExitChatAsync();

        return this._hubConnection.start().then(() => {
            this.onConnectionSuccessfully.emit();
            this._hubConnection.send('OnEnterChatAsync', this.CurrentUserName);
        });
    }

    public leaveChatAsync(): Promise<void> {
        return this._hubConnection.send('OnExitChatAsync', this.CurrentUserName)
            .then(() => {
                this._hubConnection.stop();
            });
    }

    public sendNewMessage(message: string): void {
        this._hubConnection.send('OnNewMessageAsync', this.CurrentUserName, message);
    }

    public setUserName(name: string): void {
        localStorage.setItem('username', name);
    }

    private assignNewMessageReceived(): void {
        this._hubConnection.on('OnNewMessageAsync', (userName: string, messageContent: string) => {
            const newMessage = new Message(userName, messageContent, MessageTypeEnum.OtherUser);
            this.newMessageReceivedEvent.emit(newMessage);
        });
    }

    private assignOnUserEnterChatAsync(): void {
        this._hubConnection.on('OnEnterChatAsync', (userName: string) => {
            const newMessage = new Message(userName, `${userName} ingressou no chat`, MessageTypeEnum.ChatActions);
            this.newMessageReceivedEvent.emit(newMessage);
        });
    }

    private assignOnUserExitChatAsync(): void {
        this._hubConnection.on('OnExitChatAsync', (userName: string) => {
            const newMessage = new Message(userName, `${userName} saiu do chat`, MessageTypeEnum.ChatActions);
            this.newMessageReceivedEvent.emit(newMessage);
        });
    }
}