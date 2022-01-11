import m from "mithril";

import auth from "./models/auth.js";
import main from "./views/main.js";
import menu from "./views/menu.js";
import login from "./views/login.js";
import signup from "./views/signup.js";
import events from "./views/events.js";
import map from "./views/map.js";
import places from "./views/places.js";
import error from "./views/error.js";

var app = {
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady: function () {
    m.route(document.body, "/", {
      "/": {
        render: function () {
          return m(main);
        }
      },
      "/menu": {
        render: function () {
          return m(menu);
        }
      },
      "/log-in": {
        render: function () {
          return m(login);
        }
      },
      "/sign-up": {
        render: function () {
          return m(signup);
        }
      },
      "/event-result": {
        render: function () {
          return m(events);
        }
      },
      "/map": {
        render: function () {
          return m(map);
        }
      },
      "/print-map": {
        render: function () {
          if (auth.token) {
            return m(places);
          }

          return m.route.set("/log-in");
        }
      },
      "/error": {
        render: function () {
          return m(error);
        }
      }
    });
  },
};

app.initialize();
