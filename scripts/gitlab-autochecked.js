// ==UserScript==
// @name         GITLAB merge AUTOCHECKED remover
// @version      0.1
// @description  Automaticky zaškrtne checkbox pre Master vetvu a ignoruje Alfa/Beta
// @author       Dajo
// @match        https://gitlab.i.etech.sk/*/*/merge_requests/new?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var brachName = 'master';
    var checkElement = document.querySelector('#merge_request_force_remove_source_branch');
    if (checkElement === null || checkElement.type.toLowerCase() !== 'checkbox') {
        return;
    }
    var typeElement = document.querySelector('#select2-chosen-1');
    if (typeElement === null || typeElement.innerHTML.toLowerCase() !== brachName.toLowerCase()) {
        checkElement.checked = false;
        return;
    }
    checkElement.checked = true;
})();
