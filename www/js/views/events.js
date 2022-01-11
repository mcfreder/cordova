import m from "mithril";

import ticketmaster from "../models/ticket.js";
import vanilla from "../models/vanilla.js";
import maper from "../models/maper.js";

var events = {
  oncreate: function () {
    vanilla.toTop();
  },

  limitText: function (text, url) {
    var length = 150;

    if (!text) {
      return m("div.entry__excerpt", [
        m("p", "Missing event description", [
          m("a", { href: url }, " ...")
        ])
      ]);
    } else {
      var trimmedString = text.length > length ?
        text.substring(0, length - 3) :
        text;

      return m("div.entry__excerpt", [
        m("p", trimmedString, [
          m("a", { href: url }, " ...")
        ])
      ]);
    }
  },

  runMap: function (event) {
    if (event._embedded) {
      if (event._embedded.venues[0].location) {
        maper.eventlatitude = event._embedded.venues[0].location.latitude;
        maper.eventlongitude = event._embedded.venues[0].location.longitude;
        maper.getPlacesLocation();
      } else {
        maper.status = "failed to load data";
        m.route.set("/map");
      }
    } else {
      maper.status = "failed to load data";
      m.route.set("/map");
    }
  },

  view: function () {
    return [
      m("div.#places.places", ""),
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
        ticketmaster.results.length != 0 ?
          m("div.masonry", ticketmaster.results.map(function (event) {
            return m("article.masonry__brick.entry.format-standard", [
              m("div.entry__thumb", [
                m("a.entry__thumb-link", [
                  m("img", { src: event.images[1].url })
                ])
              ]),
              m("div.entry__text", [
                m("div.entry__header", [
                  m("div.entry__date",
                    [vanilla.date(event.dates.start.localDate)]),
                  m("h1.entry__title", event.name)
                ]),
                event.description ?
                  events.limitText(event.description, event.url) :
                  event.info ?
                    events.limitText(event.info, event.url) :
                    event.promoter ?
                      events.limitText(event.promoter.description,
                        event.url) :
                      events.limitText("Missing event description",
                        event.url),
                m("div.entry__meta", [
                  m("span.entry__meta-links", [
                    m("a", {
                      onclick: function () {
                        maper.result = undefined;
                        maper.status = undefined;
                        events.runMap(event);
                      }
                    }, "Find a bar ...")
                  ])
                ])
              ])
            ]);
          })) :
          m("p")
      ])
    ];
  }
};

export default events;
