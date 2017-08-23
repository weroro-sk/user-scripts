// ==UserScript==
// @name         GITLAB merge AUTOCHECKED remover
// @version      1.0.0
// @description  Automaticky zaškrtne checkbox pre Master vetvu a ignoruje Alfa/Beta
// @author       weroro
// @updateURL    https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/gitlab-autochecked.user.js
// @downloadURL  https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/gitlab-autochecked.user.js
// @match        https://gitlab.i.etech.sk/*/*/merge_requests/new?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var branchName = 'master';
    var checkElement = document.querySelector('#merge_request_force_remove_source_branch');
    if (checkElement === null || checkElement.type.toLowerCase() !== 'checkbox') {
        return;
    }
    var typeElement = document.querySelector('#select2-chosen-1');
    if (typeElement === null || typeElement.innerHTML.toLowerCase() !== branchName.toLowerCase()) {
        checkElement.checked = false;
        return;
    }
    checkElement.checked = true;

})();
