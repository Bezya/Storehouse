import utils from './utils.js';
import LoginController from './login/login.controller.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';

import HomeController from './home/home.controller.js';
import HomeModel from './home/home.model.js';
import HomeView from './home/home.view.js';
import Observer from './home/observer.js';

import GalleryController from "./gallery/gallery.controller.js";
import GalleryModel from "./gallery/gallery.model.js";
import GalleryView from "./gallery/gallery.view.js";

import ProfileController from './profile/profile.controller.js';
import ProfileModel from './profile/profile.model.js';
import ProfileView from './profile/profile.view.js';

import CommonModel from './common.model.js';

let activatedRoutes = {};

const commonModel = new CommonModel();

const wrapper = document.querySelector("#wrapper");

let routeConfig = {
    "": () => {
        utils.initTemplate(wrapper, "login-view");
        let model = new LoginModel;
        let view = new LoginView;
        new LoginController(commonModel, model, view, utils);
    },
    "home": () => {
        //utils.refreshState
        utils.initTemplate(wrapper, "home-view");
        let observer = new Observer;
        let model = new HomeModel;
        let view = new HomeView;
        new HomeController(commonModel, model, view, observer, new utils)
    },
    "gallery":() => {
            utils.initTemplate(wrapper, "gallery-view");
            let model = new GalleryModel;
            let view = new GalleryView;
            new GalleryController(commonModel, model, view, new utils);
    },
    "profile":  () => {
        utils.initTemplate(wrapper, "profile-view");
            let model = new ProfileModel;
            let view = new ProfileView;
            new ProfileController(commonModel, model, view, new utils)
    }
};

function activateRoute(routeName){
    let route = routeConfig[routeName];
    route && route();
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
    if(routeName && !utils.isLoggedIn()) {
        utils.navigateTo("");
    } else {
        activateRoute(routeName);
    }
}