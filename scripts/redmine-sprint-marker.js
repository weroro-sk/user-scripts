// ==UserScript==
// @name         mark sprint Rows By Name
// @version      0.1
// @author       Dajo
// @match        https://redmine.azet.sk/sprints/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * @param {HTMLElement} childElement
     * @returns {boolean|Element}
     */
    function getParentElementRow(childElement) {
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
        return false;
    }

    /**
     * @param {string} markSprintRowName
     * @param {string} [customColor]
     * @returns {boolean}
     */
    function markBacklogRowsByName(markSprintRowName, customColor) {
        if (typeof markSprintRowName !== 'string') {
            return false;
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
                if (parentElementRow !== false && parentElementRow.style.background !== parentElementRowBackgroundColor) {
                    parentElementRow.style.background = parentElementRowBackgroundColor;
                }
            }
        }
        return true;
    }

    /** @type {Element} */
    var actualUserNameElement = document.querySelector('#loggedas a');
    if (typeof actualUserNameElement !== 'undefined' && actualUserNameElement !== null) {
        /** @type {string} */
        var actualUserName = actualUserNameElement.innerHTML.toLowerCase();
        //actualUserName = 'chymo';
        //actualUserName = 'kurek';
        markBacklogRowsByName(actualUserName);
    }

})();
