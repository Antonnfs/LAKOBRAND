import "../scss/style.scss";
import "./libs/dynamic_adapt.js";
import './libs/wNumb.min.js';
import * as flsFunctions from "./files/functions.js";
flsFunctions.addTouchClass();
flsFunctions.menuInit();
flsFunctions.fullVHfix();
flsFunctions.tabs();
flsFunctions.initPopups();
import * as flsForms from "./files/forms/forms.js";
flsForms.formFieldsInit();
import "./files/sliders.js";
import * as flsScroll from "./files/scroll/scroll.js";
flsScroll.scrollWatcher();
flsScroll.pageNavigation();

import "./files/script.js";
import "./files/addToCart.js";
import "./files/orderform.js"

