const OfferLetterContract = artifacts.require("OfferLetterContract");

module.exports = function (deployer) {
    deployer.deploy(OfferLetterContract);
};