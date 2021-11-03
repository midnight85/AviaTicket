import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// init select
let select = document.querySelectorAll("select");
M.FormSelect.init(select);

export function getSelectedInstance(elem) {
    return M.FormSelect.getInstance(elem);
}
// init datepicker
let datepicker = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepicker,{
    showClearBtn: true,
    format:'yyyy-mm',
});

export function getDatepickerInstance(elem) {
    return M.Datepicker.getInstance(elem);
}
// init autocomplete
let autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

let dropdown = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropdown,{
    closeOnClick:false,
});