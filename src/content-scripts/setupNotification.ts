export const NOTIFICATION_ID = 'notification';

export const setupNotification = () => {
    const notification = document.createElement('div');
    notification.id = NOTIFICATION_ID;
    notification.className = NOTIFICATION_ID;
    document.body.appendChild(notification);
};
