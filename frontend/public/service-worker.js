let notificationData;

self.addEventListener("push", function (event) {
  if (event.data) {
    notificationData = event.data.json();
    console.log(notificationData);

    self.registration.showNotification("Bike Track Alert 🚨", {
      body: notificationData.message,
      icon: "/assets/bike-stolen.png",
      data: notificationData,
    });
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const { bicycle } = event.notification.data;

  event.waitUntil(clients.openWindow(`/main?page=map&bike_id=${bicycle.id}`));
});
