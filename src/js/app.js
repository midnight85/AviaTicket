import "../css/style.css";
import "./plugins";
import api from "./services/apiService";
import locations from "./store/location";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favoritesUI from "./views/favorites";

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    favoritesUI.renderFavorites();
    const form = formUI.form;
    const tickets_container = ticketsUI.container;
    const favorites_container = favoritesUI.container;
    // Events
    favorites_container.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("delete-favorite")) {
            let ticket_id = e.target.closest("div[data-id]").dataset.id;
            favoritesUI.removeFavorites(ticket_id);
            favoritesUI.renderFavorites();
            favoritesUI.toggleTicketStarOnDelete(ticket_id, "true");
        }
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();

    });
    tickets_container.addEventListener("click", (e) => {
        let ticket_num = e.target.closest("div[data-ticket]").dataset.ticket;
        let ticket_id = e.target.closest("div[data-id]").dataset.id;
        if (e.target.dataset.favorites === "false") {
            favoritesUI.setFavorites(ticket_num, locations.lastSearch);
            favoritesUI.renderFavorites();
            favoritesUI.toggleTicketStarOnDelete(ticket_id, "false");
        } else if (e.target.dataset.favorites === "true") {
            favoritesUI.removeFavorites(ticket_id);
            favoritesUI.renderFavorites();
            favoritesUI.toggleTicketStarOnDelete(ticket_id, "true");
        }
    });

    // Handels
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }
    async function onFormSubmit(e) {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;
        console.log(origin, destination, depart_date, return_date, currency);
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });
        ticketsUI.renderTickets(locations.lastSearch);
        favoritesUI.toogleTicketStarFromLocalStorage(locations.lastSearch);
        // console.log(`${locations.lastSearch[0].origin}-${locations.lastSearch[0].destination}_${new Date(locations.lastSearch[0].departure_at).getTime()}`);
        // let favArray = {};
        // favArray[0]=locations.lastSearch[0];
        // favArray[1]=locations.lastSearch[1];
        // favArray[2]=locations.lastSearch[2];
        // localStorage.setItem("favorites", JSON.stringify(favArray));
        // console.log(JSON.parse(localStorage.getItem("favorites"))[0]);
    }
});
// locations.serializeCounrties(api.countries().then((res) => {(res)}));
// api.countries().then((res) => {(res)});
// api.cities().then(res=>console.log(res));
//  locations.init();
// locations.countries;
// console.log(locations.countries);
