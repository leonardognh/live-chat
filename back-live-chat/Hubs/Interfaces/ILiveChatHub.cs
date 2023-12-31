﻿namespace BackLiveChatAPI.Hubs.Interfaces
{
    public interface ILiveChatHub
    {
        Task OnExitChatAsync(string userName);
        Task OnEnterChatAsync(string userName);
        Task OnNewMessageAsync(string userName, string message);
    }
}
