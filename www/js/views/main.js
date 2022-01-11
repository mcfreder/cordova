import m from "mithril";

import ticketmaster from "../models/ticket.js";

var main = {
  search_value: "",

  oninit: function () {
    ticketmaster.alertResult = "";
    main.search_value = "";
    main.query = [];
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
        m("form.header__search-form", {
          onsubmit: function (event) {
            event.preventDefault();
            ticketmaster.getSearch(main.search_value);
          }
        }, [
          m("label", [
            m("span.hide-content", "Find your event:"),
            m("input.search-field[placeholder=Type Keyword][type=search]" +
              "[autocomplete=off]", {
              oninput: function (e) {
                main.search_value = e.target.value;
              }
            })
          ]),
          m("input.search-submit[type=submit][value=Press Here to begin your search.]"),
          ticketmaster.alertResult ?
            m("div.alert-box.alert-box--error.hideit", [
              m("p", "Found 0 events matching your search value.")
            ]) :
            m("p")
        ]),
        m("div#madeby", [
          m("span", "Powered by ", [
            m("a", "Ticketmaster")
          ])
        ])
      ])
    ];
  }
};

export default main;
