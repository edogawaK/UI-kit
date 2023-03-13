const ALERT = {
  SUCCESS: {
    name: 'SUCCESS',
    class: 'alert-success',
  },
  DANGER: {
    name: 'DANGER',
    class: 'alert-danger',
  },
  WARNING: {
    name: 'WARNING',
    class: 'alert-warning',
  },
};

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

class Notification {
  static alerts = [];
  static alertContent = null;
  static notificate(message, type) {
    let alert = htmlToElement(`<div class="alert hide" role="alert"></div>`);
    Notification.alertContent.appendChild(alert);
    Notification.alerts.push(alert);

    alert.classList.remove('hide');
    alert.classList.add(type);
    alert.innerHTML = message;

    setTimeout(() => {
      alert.classList.add('hide');
      alert.classList.remove(type);
    }, 4000);

    setTimeout(() => {
      alert.remove();
    }, 10000);
  }
  static success(message) {
    Notification.notificate(message, ALERT.SUCCESS.class);
  }
  static danger(message) {
    Notification.notificate(message, ALERT.DANGER.class);
  }
  static warning(message) {
    Notification.notificate(message, ALERT.WARINNG.class);
  }
  static destroy() {
    for (const alert of Notification.alerts) {
      alert.remove();
    }
    Notification.alert = [];
  }
  static init() {
    Notification.alertContent = document.querySelector('.alert-content');
    if (!Notification.alertContent) {
      Notification.alertContent = htmlToElement(`<div class="alert-content"></div>`);
      document.body.appendChild(Notification.alertContent);
    }
  }
}
