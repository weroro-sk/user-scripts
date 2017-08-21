// ==UserScript==
// @name         Eva Vona Roka Stats autorefresh
// @version      0.1
// @author       dajo
// @match        https://eva.cas.sk/eva-vona-roka/stat-01
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    setTimeout(function () {
        window.location.reload();
    }, 15000);
})();
