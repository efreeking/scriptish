var EXPORTED_SYMBOLS = ["Scriptish_popupNotification"];
Components.utils.import("resource://gre/modules/PopupNotifications.jsm");
Components.utils.import("resource://scriptish/constants.js");
lazyImport(this, "resource://scriptish/scriptish.js", ["Scriptish"]);
lazyImport(this, "resource://scriptish/prefmanager.js", ["Scriptish_prefRoot"]);
lazyImport(this, "resource://scriptish/logging.js", ["Scriptish_log"]);

function Scriptish_popupNotification(details) {
  if (!Scriptish_prefRoot.getValue("enabledNotifications.popup"))
    return Scriptish_log(details.message);

  let secondaryActions = details.secondaryActions || [];

  var win = Scriptish.getMostRecentWindow();
  if (win && win.PopupNotifications) {
    timeout(function() {
      win.PopupNotifications.show(
        win.gBrowser.selectedBrowser,
        details.id,
        details.message,
        "scriptish-notification-icon",
        {
          label: details.mainAction.label,
          accessKey: details.mainAction.accessKey,
          callback: function() {
            details.mainAction.callback();
          }
        },
        secondaryActions,
        details.options
      );
    });

    return true;
  }

  return false;
};
