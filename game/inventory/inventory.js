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
        if (this.getPotions() > 0)
            this.addPotions(-n);
    };

    Inventory.prototype.useAntitodes = function (n) {
        if (this.getAntitodes() > 0)
            this.addAntitodes(-n);
    };

    Inventory.prototype.useMegapotions = function (n) {
        if (this.getMegapotions() > 0)
            this.addMegapotions(-n);
    };

    Inventory.prototype.useRevives = function (n) {
        if (this.getRevives() > 0)
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