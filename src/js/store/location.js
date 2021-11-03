import api from "../services/apiService";
import { formateDate } from "../helpers/date";
class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.airlines = null;
        this.shortCitiesList = {};
        this.lastSearch = {};
        this.airlines = {};
        this.formateDate = helpers.formateDate;
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);
        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);
        // console.log(this.countries);
        this.cities = this.serializeCities(cities);
        // console.log(this.cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        // console.log(this['shortCitiesList']);
        // console.log(this.cities);
        return response;
    }
    createShortCitiesList(cities) {
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.full_name] = null;
            return acc;
        }, {});
    }
    serializeAirlines(airlines) {
        return airlines.reduce((acc, airline) => {
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
            airline.name = airline.name || airline.name_translations.en;
            acc[airline.code] = airline;
            return acc;
        }, {});
    }
    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            // const country_name = this.getCountryByCode(city.country_code);
            const country_name = this.countries[city.country_code].name;
            const city_name = city.name || city.name_translations.en;
            const full_name = `${city_name}, ${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            };
            return acc;
        }, {});
    }
    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }
    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : "";
    }
    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : "";
    }
    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find(
            (item) => item.full_name === key
        );
        return city.code;
    }
    getCountryByCode(code) {
        return this.countries[code].name;
    }
    getCityNameByCode(code) {
        return this.cities[code].name;
    }
    getCitiesByCountryCode(code) {
        return this.cities.filter((city) => city.country_code === code);
    }
    setTicketId(flight_number, origin, destination, departure_at) {
        return `${flight_number}_${origin}-${destination}_${new Date(
            departure_at
        ).getTime()}`;
    }
    async fetchTickets(params) {
        const response = await this.api.prices(params);
        this.lastSearch = this.serializeTickets(response.data);
        console.log(this.lastSearch);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map((ticket) => {
            return {
                ...ticket,

                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formateDate(
                    ticket.departure_at,
                    "dd MMM yyyy hh:mm"
                ),
                return_at: this.formateDate(
                    ticket.return_at,
                    "dd MMM yyyy hh:mm"
                ),
                ticket_id: this.setTicketId(
                    ticket.flight_number,
                    ticket.origin,
                    ticket.destination,
                    ticket.departure_at
                ),
            };
        });
    }
}
const locations = new Locations(api, { formateDate });
export default locations;
