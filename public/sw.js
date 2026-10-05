// Only here so the timer can show notifications: Android and installed PWAs
// don't allow `new Notification()` from the page. No fetch handler on purpose,
// so nothing is cached and deploys are never served stale. Registered with
// scope "/sw/" (see Clock.tsx), so it controls no page and windows are
// found with includeUncontrolled.

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) =>
        clients.length > 0 ? clients[0].focus() : self.clients.openWindow("/"),
      ),
  );
});
