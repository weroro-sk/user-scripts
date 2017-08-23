// ==UserScript==
// @name         Mark User Story Rows
// @version      1.0.0
// @description  Marks User Story Rows in Redmine Sprint Plugin By Name
// @author       weroro
// @updateURL    https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/redmine-sprint-marker.user.js
// @downloadURL  https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/redmine-sprint-marker.user.js
// @match        https://redmine.azet.sk/sprints/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * @param {HTMLElement} childElement
     * @returns {null|Element}
     */
    var getParentElementRow = function (childElement) {
        /** @type {NodeList} */
        var parentElementRows = document.querySelectorAll('tr.sprint-board');
        /** @type {number} */
        var parentIterator;
        for (parentIterator = 0; parentIterator < parentElementRows.length; parentIterator++) {
            var parentElementRow = parentElementRows[parentIterator];
            /** @type {NodeList} */
            var childElements = parentElementRow.querySelectorAll('*');
            /** @type {number} */
            var childIterator;
            for (childIterator = 0; childIterator < childElements.length; childIterator++) {
                if (childElements[childIterator] === childElement) {
                    return parentElementRow;
                }
            }
        }
        return null;
    };

    /**
     * @param {string} markSprintRowName
     * @param {string} [customColor]
     * @returns {void}
     */
    var markBacklogRowsByName = function (markSprintRowName, customColor) {
        if (typeof markSprintRowName !== 'string') {
            return;
        }
        /** @type {string} */
        var parentElementRowBackgroundColor = customColor || 'red';
        /** @type {NodeList} */
        var sprintBoxUserNames = document.querySelectorAll('#sprint_board a.user');
        /** @type {number} */
        var sprintBoxIterator;
        for (sprintBoxIterator = 0; sprintBoxIterator < sprintBoxUserNames.length; sprintBoxIterator++) {
            /** @type {HTMLElement} */
            var userNameElement = sprintBoxUserNames[sprintBoxIterator];
            if (userNameElement.innerHTML.toLowerCase().indexOf(markSprintRowName) > -1) {
                /** @type {boolean|Element} */
                var parentElementRow = getParentElementRow(userNameElement);
                if (parentElementRow !== null && parentElementRow.style.background !== parentElementRowBackgroundColor) {
                    parentElementRow.style.background = parentElementRowBackgroundColor;
                }
            }
        }
    };

    /** @type {Element} */
    var actualUserNameElement = document.querySelector('#loggedas a');
    if (typeof actualUserNameElement !== 'undefined' && actualUserNameElement !== null) {
        /** @type {string} */
        var actualUserName = actualUserNameElement.innerHTML.toLowerCase();
        /** actualUserName = 'kurek'; */
        markBacklogRowsByName(actualUserName);
    }

})();
