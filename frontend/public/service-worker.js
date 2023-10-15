self.addEventListener("push", function (event) {
  if (event.data) {
    let data = event.data.json();
    console.log(data);

    self.registration.showNotification("Bike Track Alert 🚨", {
      body: data.message,
      icon: "/assets/bike-stolen.png",
    });
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(`/main?page=map&bike_id=${data.bicycle.id}`)
  );
});
