// ==UserScript==
// @name         New window task opening
// @version      1.0.0
// @description  Sets target blank attribute for all task anchors in sprint table
// @author       weroro
// @updateURL    https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/redmine-target-blank.user.js
// @downloadURL  https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/redmine-target-blank.user.js
// @match        https://redmine.azet.sk/sprints/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /** @type {NodeList} */
    var issueAnchors = document.querySelectorAll('.issue');
    if (issueAnchors === null || issueAnchors.length < 1) {
        return;
    }
    /** @type {number} */
    var anchorKey;
    for (anchorKey = 0; anchorKey < issueAnchors.length; anchorKey++) {
        issueAnchors[anchorKey].setAttribute('target', '_blank');
    }
})();