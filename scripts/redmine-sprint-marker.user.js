// ==UserScript==
// @name         Mark Sprint board Rows
// @version      1.2.2
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
            '#A4C0D7',
            '#E9B1FF',
            '#9CFFA4'
        ];

        /** @type {number} */
        var rowsRecheckTime = 5;

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
                if (sprintRowColumnNameElementText.length && sprintRowColumnNameElementText.indexOf(self.userName) > -1) {
                    return true;
                }
            }
            return false;
        };

        /**
         *
         */
        var findAndMarkRowsByPriority = function () {
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
                sprintRowColumnsLoopFlag:
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
                                continue sprintRowColumnsLoopFlag;
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
            var lowerCasedInputString = inputString.toLowerCase();
            /** @type {Array} */
            var charactersArray = lowerCasedInputString.split('');
            /** @type {string} */
            var outputString = '';
            /** @type {number} */
            var charIndex = 0;
            for (; charIndex < charactersArray.length; charIndex++) {
                /** @type {number} */
                var characterIndex = 'áéíýóúôäščťžňřŕľěĺ'.indexOf(charactersArray[charIndex]);
                if (characterIndex < 0) {
                    outputString += lowerCasedInputString.charAt(charIndex);
                    continue;
                }
                outputString += 'aeiyouoasctznrrlel'.charAt(characterIndex);
            }
            return outputString;
        };

        /**
         * @returns {string}
         */
        this.getUserName = function () {
            /** @type {Element} */
            var actualUserNameElement = document.querySelector('#loggedas a') || null;
            if (!!actualUserNameElement) {
                return actualUserNameElement.innerHTML.toLowerCase();
            }
            return '';
        };

        /**
         * @param {boolean} [skipSetInterval]
         */
        this.init = function (skipSetInterval) {
            if (skipSetInterval !== true ||
                typeof window.findAndMarkRowsByPriorityInterval !== 'undefined' &&
                window.findAndMarkRowsByPriorityInterval !== null) {
                clearInterval(window.findAndMarkRowsByPriorityInterval);
            }
            self.userName = self.refactorName(self.getUserName());
            if (self.userName.length) {
                findAndMarkRowsByPriority();
                if (skipSetInterval !== true) {
                    window.findAndMarkRowsByPriorityInterval = setInterval(findAndMarkRowsByPriority, rowsRecheckTime * 1000);
                }
            }
        };
    };

    /** @type SprintBoardRowsMarker */
    (new SprintBoardRowsMarker()).init();
})();