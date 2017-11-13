// ==UserScript==
// @name         Redmine issue open all anchors in blank window
// @version      1.0.1
// @description  Sets target blank attribute for all anchors in issue
// @author       weroro
// @updateURL    https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/issue-target-blank.user.js
// @downloadURL  https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/issue-target-blank.user.js
// @match        https://redmine.azet.sk/issues/*
// @match        http://redmine.azet.sk/issues/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /** @type {NodeList} */
    var issueAnchors = document.querySelectorAll('a');
    if (issueAnchors === null) {
        return;
    }
    /** @type {number} */
    var anchorKey = 0;
    for (; anchorKey < issueAnchors.length; anchorKey++) {
        issueAnchors[anchorKey].setAttribute('target', '_blank');
    }
})();