import "../css/style.css";
import "./plugins";
import api from "./services/apiService";
import locations from "./store/location";
import formUI from "./views/form";
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    const form = formUI.form;

    // Events
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    // Handels
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }
    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;
        console.log(origin, destination, depart_date, return_date,currency);
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });
        ticketsUI.renderTickets(locations.lastSearch)
    }
});
// locations.serializeCounrties(api.countries().then((res) => {(res)}));
// api.countries().then((res) => {(res)});
// api.cities().then(res=>console.log(res));
//  locations.init();
// locations.countries;
// console.log(locations.countries);
