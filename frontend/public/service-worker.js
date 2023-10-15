self.addEventListener("push", function (event) {
  if (event.data) {
    let text = event.data.text();
    console.log(text);

    self.registration.showNotification("NOTIFICATION", {
      body: text,
      icon: "/assets/bike-stolen.png",
    });
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(clients.openWindow("/main?page=map"));
});
