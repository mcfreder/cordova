"use strict";

import m from "mithril";

import auth from "../models/auth.js";
import vanilla from "../models/vanilla.js";
import maper from "../models/maper.js";
import places from "../models/places.js";
import events from "./events.js";

var map = {
  oncreate: function () {
    auth.needLogin = undefined;
    vanilla.toTop();
  },

  view: function () {
    return [
      m("a#return-to-top", [
        m("img", { src: "img/icons/png/icon-arrow-up.png" })
      ]),
      m("div.header__search.slide-in", [
        m("h1", "M | E | F | E | R"),
        m("div.header__toggle-menu", {
          onclick: function () {
            m.route.set("/menu");
          }
        }, [
          m("span", "Menu")
        ]),

        m("div.#places.places", ""),
        maper.result ?
          m("div.masonry", maper.result.map(function (rest) {
            return m("article.masonry__brick.entry.format-standard", [
              m("div.entry__text", [
                m("div.entry__header", [
                  m("div.entry__date", [vanilla.today()]),
                  m("h1.entry__title", rest.name)
                ]),
                m("div.entry__excerpt", [events.limitText(rest.vicinity)]),
                m("div.entry__meta", [
                  m("span.entry__meta-links", [
                    m("a", {
                      onclick: function () {
                        places.address = rest.vicinity;
                        if (!auth.token) {
                          auth.needLogin = "Error Need Login";
                        }
                        m.route.set("/print-map");
                      }
                    }, "Map")
                  ])
                ])
              ])
            ]);
          })) :
          m("div.header__search-form", [
            m("div.alert-box.alert-box--error.hideit", [
              m("p", {
                onclick: function () {
                  m.route.set("/event-result");
                }
              }, "This view is not available for this event. Click here to return.")
            ])
          ])
      ])
    ];
  }
};

export default map;
