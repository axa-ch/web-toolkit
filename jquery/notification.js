import $ from 'jquery';

class NotificationPane {

  constructor(element, options) {
    this.$element = $(element);
    console.log(this.$element);
    this.path = {
      info: this.$element.data('notification-info'),
      success: this.$element.data('notification-success'),
      error: this.$element.data('notification-error')
    };
  }
    //@path.info = @$element.data 'notification-info'
    //@path.success = @$element.data 'notification-success'
    //@path.error = @$element.data 'notification-error'

  displayNotification(notification) {

    if (notification == null) {
      return;
    }

    let $notification = $('<div class="notifications__item" ></div>');
    let $icon = null;

    if (notification.modifier) {
      console.log(notification.modifier);
      console.log(this.path);
      console.log(this.path[notification.modifier]);
      $notification.addClass(`notifications__item--${notification.modifier}`);
      $icon = `<svg class="icon notifications__item__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${this.path[notification.modifier]}"></use></svg>`;
      console.log($icon);
    }

    let $iconContainer = $('<div class="notifications__item__icon-container">');

    $iconContainer.append($icon);
    $notification.append($iconContainer);

    $notification.on('click', function() {
      return this.hideNotification($notification);
    }
    );

    let $content = $('<div class="notifications__item__content"></div>');
    if (notification.html === true) {
      $content.html(notification.content);
    } else {
      $content.text(notification.content);
    }

    $notification.append($content);

    let timeout = 2000;

    if (typeof notification.timeout === "number") {
      ({ timeout } = notification);
    }

    setTimeout((() => {
      return this.hideNotification($notification);
    }
    ), timeout);

    return this.$element.append($notification);
  }

  hideNotification($notification) {
    $notification.addClass('notifications__item--fade-out');
    return setTimeout((() => $notification.remove()), 500);
  }
}

// Plugin definition
let Plugin = function(option) {
  let params = arguments;

  return this.each(function() {
    let $this = $(this);
    let data = $this.data('axa.notification');

    if (!data) {
      data = new NotificationPane(this);
      $this.data('axa.notification', data);
    }

    if (typeof option === 'object') {
      data.displayNotification(option);
    }

    if (typeof option === 'string') {
      return data.displayNotification({
        content: option
      }
      );
    }
  });
};

// Plugin registration
$.fn.notification = Plugin;
$.fn.notification.Constructor = NotificationPane;

// DATA-API
$(document).on('click.axa.notification.data-api', '[data-notification]', function(e) {
  e.preventDefault();

  let $this = $(this);

  let $target = $($this.data('notification'));

  return Plugin.call($target, {
    content: $this.data('notification-content'),
    modifier: $this.data('notification-modifier')
  }
  );
}
);

//! Copyright AXA Versicherungen AG 2015
