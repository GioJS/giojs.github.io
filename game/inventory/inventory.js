var Inventory = (function () {
    function Inventory() {
        this.items = {
            potion: 0,
            revive: 0,
            antitode: 0,
            megapotion: 0
        }
    }

    Inventory.prototype.addPotions = function (n) {
        this.items.potion += n;
    };

    Inventory.prototype.addRevives = function (n) {
        this.items.revive += n;
    };

    Inventory.prototype.addAntitodes = function (n) {
        this.items.antitode += n;
    };

    Inventory.prototype.addMegapotions = function (n) {
        this.items.megapotion += n;
    };

    Inventory.prototype.usePotions = function (n) {
        this.addPotions(-n);
    };

    Inventory.prototype.useAntitodes = function (n) {
        this.addAntitodes(-n);
    };

    Inventory.prototype.useMegapotions = function (n) {
        this.addMegapotions(-n);
    };

    Inventory.prototype.useRevives = function (n) {
        this.addRevives(-n);
    };

    Inventory.prototype.getPotions = function () {
        return this.items.potion;
    };

    Inventory.prototype.getAntitodes = function () {
        return this.items.antitode;
    };

    Inventory.prototype.getRevives = function () {
        return this.items.revive;
    };

    Inventory.prototype.getMegapotions = function () {
        return this.items.megapotion;
    };

    return Inventory;
}());