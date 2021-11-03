import locations from "../store/location";
import currencyUI from "./currency";

class FavoritesUI {
    constructor(currency) {
        this.container = document.getElementById("dropdown1");
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    }
    toggleTicketStarOnDelete(ticket_id, boolean) {
        let fav_item = document.querySelector(
            `.tickets-sections .row div[data-id="${ticket_id}"]`
        );
        if (!fav_item) return;
        let fav_star = fav_item.querySelector("i[data-favorites]");

        if (boolean === "false") {
            fav_star.dataset.favorites = "true";
            fav_star.classList.toggle("star--selected");
        } else if (boolean === "true") {
            fav_star.dataset.favorites = "false";
            fav_star.classList.toggle("star--selected");
        }
    }
    toogleTicketStarFromLocalStorage(tickets) {
      let favorites_list = JSON.parse(localStorage.getItem("favorites"));
      let favorites_array = Array.from(Object.keys(favorites_list));
      // console.log(favorites_array);
      if (favorites_list == null) return;
      for(const item in tickets){
        let fav_id = (tickets[item]).ticket_id;
        if(favorites_array.includes(fav_id)){
          this.toggleTicketStarOnDelete(fav_id,'false')
        }
      }
  }
    setFavorites(num, lastSearch) {
        // console.log(lastSearch);
        // let ticket_id = id.closest("div[data-id]").dataset.id;
        let existingItem = JSON.parse(localStorage.getItem("favorites"));
        if (existingItem == null) {
            existingItem = {};
        }
        existingItem[lastSearch[num].ticket_id] = lastSearch[num];
        localStorage.setItem("favorites", JSON.stringify(existingItem));
    }
    removeFavorites(id) {
        // let ticket_id = id.closest("div[data-id]").dataset.id;
        let existingItem = JSON.parse(localStorage.getItem("favorites"));
        delete existingItem[id];
        localStorage.setItem("favorites", JSON.stringify(existingItem));
        // localStorage.removeItem("favorites")[id];
    }
    renderFavorites() {
        let favorites_list = JSON.parse(localStorage.getItem("favorites"));
        this.container.innerHTML = "";
        if (favorites_list === null) {
            return;
        }
        let fragment = "";
        const currency = this.getCurrencySymbol();
        for (const ticket in favorites_list) {
            // console.log(favorites_list[ticket]);
            const template = FavoritesUI.favoritesTemplate(
                favorites_list[ticket],
                currency
            );
            fragment += template;
        }

        this.container.insertAdjacentHTML("afterbegin", fragment);
    }
    static favoritesTemplate(ticket, currency) {
        return `
        <div class="favorite-item  d-flex align-items-start" data-id=${ticket.ticket_id}>
              <img src="${ticket.airline_logo}" class="favorite-item-airline-img" />
              <div class="favorite-item-info d-flex flex-column">
                <div class="favorite-item-destination d-flex align-items-center">
                  <div class="d-flex align-items-center mr-auto">
                    <span class="favorite-item-city">${ticket.origin_name}</span>
                    <i class="medium material-icons">flight_takeoff</i>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="medium material-icons">flight_land</i>
                    <span class="favorite-item-city">${ticket.destination_name}</span>
                  </div>
                </div>
                <div class="ticket-time-price d-flex align-items-center">
                  <span class="ticket-time-departure">${ticket.departure_at}</span>
                  <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                </div>
                <div class="ticket-additional-info">
                  <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                  <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                </div>
                <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
              </div>
            </div>
        `;
    }
}

const favoritesUI = new FavoritesUI(currencyUI);
export default favoritesUI;
