"use strict";

import m from "mithril";

var error = {
  view: function () {
    return [
      m("div.header__search.slide-in", [
        m("h1", "M | E | F | E | R"),
        m("div.header__toggle-menu", {
          onclick: function () {
            m.route.set("/menu");
          }
        }, [
          m("span", "Menu")
        ]),
        m("div.header__search-form", [
          m("div.alert-box.alert-box--error.hideit", [
            m("p", {
              onclick: function () {
                m.route.set("/map");
              }
            }, "Failed to find destination. Click here to return.")
          ])
        ])
      ])
    ];
  }
};

export default error;
