Module.register("MMM-OfflineAlert", {
  start: function() {
    this.state = true;
    var self = this;
    console.log(self);
    setInterval(function() {
      self.offlineCheck();
    }, 60000);
  },
  offlineCheck: function() {
    var self = this;
    var url = "/offlinealert/check";
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.timeout = 1000;
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if (request.status == 0) {
          if (self.state == true) {
            self.state = false;
            console.log("server has gone");
            self.showNotification();
          }
        }
        if (request.status == 200) {
          if (self.state == false) {
            self.state = true;
            self.hideNotification();
          }
        }
      }
    }
    request.send();
  },
  notificationReceived: function(notification, payload, sender) {
    console.log("notification received: "+ notification);
    if (notification === "OFFLINE_ALERT_SHOW") {
      console.log("show that fucking box");
      this.showNotification();
    } else if (notification === "OFFLINE_ALERT_HIDE") {
      this.hideNotification();
    }
  },
  showNotification: function() {
    this.ntf = document.createElement("div");
    this.ntf.className = "ns-box ns-growl ns-effect-slide-center ns-type-notice";
    var strinner = "<div class=\"ns-box-inner\">";
    strinner += "<span class='thin medium'>OfflineAlert</span><br />";
    strinner += "<span class='light dimmed small'>Magic mirror server offline<br />Some modules might not update currently</span>";
		strinner += "</div>";
    this.ntf.innerHTML = strinner;
    document.body.append(this.ntf);
    classie.remove(this.ntf, "ns-hide");
    classie.add(this.ntf, "ns-show");
  },
  hideNotification: function() {
    var self = this;
    classie.remove(this.ntf, "ns-show");
    setTimeout(function() {
      classie.add(self.ntf, "ns-hide");
      document.body.removeChild(self.ntf);
    }, 25);
  }
});
