var meta = function (name) {
    return document
        .querySelector("meta[name='" + name + "']")
        .getAttribute("content");
};

module.exports = meta;
