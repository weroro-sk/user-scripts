// ==UserScript==
// @name         Programujte.com - Odstránenie postrannej reklamy
// @version      1.0.0
// @description  Odstraňuje reklamu, ktorá je imúnna voči AdBlocku
// @author       Dárius Bokor [info@weroro.sk]
// @match        http://programujte.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * @constructor AdRemover
     */
    var AdRemover = function () {
        /**
         * @type {AdRemover}
         */
        var self = this;

        this.leftContentId = '#branding_anchor_left';
        this.rightContentId = '#branding_anchor_right';
        this.bgImageId = '#highlight_background';

        /**
         * @param {Element} element
         * @returns {AdRemover}
         */
        this.removeElement = function (element) {
            if (!!element === false) {
                return self;
            }
            element.parentNode.removeChild(element);
            return self;
        };

        /**
         * @returns {void}
         */
        this.init = function () {
            var d = document;
            /** @type {Element} */
            var adBackground = d.querySelector(self.bgImageId);
            if (adBackground !== null) {
                adBackground.style.background = 'none';
            }
            /** @type {Element} */
            var leftContent = d.querySelector(self.leftContentId);
            /** @type {Element} */
            var rightContent = d.querySelector(self.rightContentId);
            self.removeElement(leftContent).removeElement(rightContent);
        };
    };

    (new AdRemover()).init();
})();
