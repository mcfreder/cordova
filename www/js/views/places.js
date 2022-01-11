"use strict";

import m from "mithril";

import places from "../models/places.js";

var map = {
  oncreate: function () {
    places.showMap();
  },

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
        m("div.#map.map", "")
      ])
    ];
  }
};

export default map;
