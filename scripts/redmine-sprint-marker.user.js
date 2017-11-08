// ==UserScript==
// @name         Mark Sprint board Rows
// @version      1.2.1
// @description  Marks Sprint board Rows in Redmine Sprint Plugin By Name and priority
// @author       weroro
// @updateURL    https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/redmine-sprint-marker.user.js
// @downloadURL  https://raw.githubusercontent.com/weroro-sk/user-scripts/master/scripts/redmine-sprint-marker.user.js
// @match        https://redmine.azet.sk/sprints/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * @constructor SprintBoardRowsMarker
     */
    var SprintBoardRowsMarker = function () {

        /** @type {SprintBoardRowsMarker} */
        var self = this;

        /**
         * @description Index 0 is highest priority.
         * @type {[string,string,string]|Array}
         */
        var colorsByPriority = [
            '#C8E7FF',
            '#E9B1FF',
            '#9CFFA4'
        ];

        /** @type {string} */
        this.userName = '';

        /**
         * @param {Element} sprintRowColumnNameElement
         * @returns {boolean}
         */
        var testUserName = function (sprintRowColumnNameElement) {
            if (typeof sprintRowColumnNameElement !== 'undefined' && sprintRowColumnNameElement !== null) {
                /** @type {string} */
                var sprintRowColumnNameElementText = self.refactorName(sprintRowColumnNameElement.innerHTML);
                if (sprintRowColumnNameElementText.length && sprintRowColumnNameElementText.toLowerCase().indexOf(self.userName) > -1) {
                    return true;
                }
            }
            return false;
        };

        /**
         *
         */
        var findAndMarkRowByPriority = function () {
            /** @type {NodeList|Array} */
            var sprintRows = document.querySelectorAll('#sprint_board > tr.sprint-board') || [];
            /** @type {number} */
            var sprintRowColumnPriority = 0;
            /** @type {number} */
            var sprintRowIndex = 0;
            for (; sprintRowIndex < sprintRows.length; sprintRowIndex++) {
                /** @type {Element} */
                var sprintRow = sprintRows[sprintRowIndex];
                /** @type {NodeList|Array} */
                var sprintRowColumns = sprintRow.querySelectorAll(':scope > td') || [];
                /** @type {number} */
                var sprintRowColumnIndex = 1;
                dataLoop:
                    for (; sprintRowColumnIndex < sprintRowColumns.length; sprintRowColumnIndex++) {
                        /** @type {NodeList|Array} */
                        var sprintRowColumnNameElements = sprintRowColumns[sprintRowColumnIndex].querySelectorAll('a.user') || [];
                        /** @type {number} */
                        var sprintRowColumnNameElementIndex = 0;
                        for (; sprintRowColumnNameElementIndex < sprintRowColumnNameElements.length; sprintRowColumnNameElementIndex++) {
                            /** @type {Element} */
                            var sprintRowColumnNameElement = sprintRowColumnNameElements[sprintRowColumnNameElementIndex];
                            if (testUserName(sprintRowColumnNameElement)) {
                                if (sprintRowColumnPriority < 1 || sprintRowColumnIndex < sprintRowColumnPriority) {
                                    sprintRowColumnPriority = sprintRowColumnIndex;
                                }
                                continue dataLoop;
                            }
                        }
                    }
                if (sprintRowColumnPriority > 0) {
                    sprintRow.style.backgroundColor = colorsByPriority[sprintRowColumnPriority - 1];
                    sprintRowColumnPriority = 0;
                }
            }
        };

        /**
         * @param {string} inputString
         * @returns {string}
         */
        this.refactorName = function (inputString) {
            if (typeof inputString !== 'string' || inputString.length < 2) {
                return '';
            }
            /** @type {string} */
            var oldChars = 'áéíýóúôäščťžňřŕľěĺ';
            /** @type {string} */
            var newChars = 'aeiyouoasctznrrlel';
            inputString = inputString.toLowerCase();
            /** @type {Array} */
            var charArray = inputString.split('');
            /** @type {string} */
            var outputString = '';
            /** @type {number} */
            var index;
            /** @type {number} */
            var charIndex = 0;
            for (; charIndex < charArray.length; charIndex++) {
                /** @type {Number} */
                index = oldChars.indexOf(charArray[charIndex]);
                if (index < 0) {
                    outputString += inputString.charAt(charIndex);
                } else {
                    outputString += newChars.charAt(index);
                }
            }
            return outputString;
        };

        /**
         * @param {string} [customUserName]
         * @returns {string}
         */
        this.getUserName = function (customUserName) {
            /** @type {string} */
            var actualUserName = customUserName || '';
            if (typeof actualUserName === 'string' && actualUserName.length > 2) {
                console.warn('Custom User Name:', customUserName);
                return actualUserName.toLowerCase();
            }
            /** @type {Element} */
            var actualUserNameElement = document.querySelector('#loggedas a');
            if (!!actualUserNameElement) {
                actualUserName = actualUserNameElement.innerHTML.toLowerCase();
            }
            return actualUserName;
        };

        /**
         * @param {string} [customUserName]
         */
        this.init = function (customUserName) {
            clearInterval(window.findAndMarkRowByPriorityInterval);
            self.userName = self.refactorName(self.getUserName(customUserName));
            if (self.userName.length) {
                findAndMarkRowByPriority();
                window.findAndMarkRowByPriorityInterval = setInterval(findAndMarkRowByPriority, 15000);
            }
        };
    };

    /**
     *
     */
    (new SprintBoardRowsMarker()).init();
})();