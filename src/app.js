import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Root from './components/Root';
import 'bootstrap';
import './app.scss';
import toastr from 'toastr';

toastr.options = {
    "debug": false,
    "positionClass": "toast-bottom-right",
    "onclick": null,
    "fadeIn": 300,
    "fadeOut": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "newestOnTop" : false
};


ReactDOM.render(
    <BrowserRouter>
        <Root/>
    </BrowserRouter>,
    document.getElementById('root')
);