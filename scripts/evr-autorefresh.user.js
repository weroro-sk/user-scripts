// ==UserScript==
// @name         Eva Vona Roka Stats autorefresh
// @version      1.0.0
// @description  Automaticky zaškrtne checkbox pre Master vetvu a ignoruje Alfa/Beta
// @author       weroro
// @updateURL    https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/evr-autorefresh.user.js
// @downloadURL  https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/evr-autorefresh.user.js
// @match        https://eva.cas.sk/eva-vona-roka/stat-01
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(function () {
        window.location.reload();
    }, 15000);

})();
