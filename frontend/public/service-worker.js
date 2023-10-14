self.addEventListener("push", function (event) {
  if (event.data) {
    let text = event.data.text();
    console.log(text);

    self.registration.showNotification("NOTIFICATION", {
      body: text, // you can add more data here as per your requirement
      // icon: "/icon.png", // replace with your icon path
    });
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // to close the notification

  event.waitUntil(
    clients.openWindow("/main") // assuming "/" is your home page
  );
});
