import axios from "axios";


export const getAllCurrencyApi = () =>  axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');