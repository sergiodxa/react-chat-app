function notify(title, message) {
  if (Notification.permission !== "granted") return;
  new Notification(title, { body: message });
}

export default notify;
