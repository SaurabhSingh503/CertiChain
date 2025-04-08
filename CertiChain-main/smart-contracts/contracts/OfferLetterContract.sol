// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OfferLetterContract {
    struct OfferLetter {
        string offerLetterId;
        string employer;
        string candidate;
        string salary;
        string position;
        string date;
        string offerHash;
        string uniqueURL;
    }

    mapping(string => OfferLetter) private offerLetters;
    mapping(string => bool) private offerLetterExists;

    event OfferLetterCreated(string offerLetterId, string employer, string candidate, string offerHash, string uniqueURL);

    function createOfferLetter(
        string memory offerLetterId,
        string memory employer,
        string memory candidate,
        string memory salary,
        string memory position,
        string memory date
    ) public {
        require(!offerLetterExists[offerLetterId], "Offer letter ID already exists");

        // Create offer hash
        string memory offerDetails = string(abi.encodePacked(employer, candidate, salary, position, date));
        bytes32 offerHashBytes = keccak256(abi.encodePacked(offerDetails));
        string memory offerHash = toHexString(offerHashBytes);

        // Generate unique URL
        string memory uniqueURL = string(abi.encodePacked("https://company.com/offer/", offerLetterId));

        OfferLetter memory newOfferLetter = OfferLetter({
            offerLetterId: offerLetterId,
            employer: employer,
            candidate: candidate,
            salary: salary,
            position: position,
            date: date,
            offerHash: offerHash,
            uniqueURL: uniqueURL
        });

        offerLetters[offerLetterId] = newOfferLetter;
        offerLetterExists[offerLetterId] = true;

        emit OfferLetterCreated(offerLetterId, employer, candidate, offerHash, uniqueURL);
    }

    function queryOfferLetter(string memory offerLetterId)
        public
        view
        returns (
            string memory employer,
            string memory candidate,
            string memory salary,
            string memory position,
            string memory date,
            string memory offerHash,
            string memory uniqueURL
        )
    {
        require(offerLetterExists[offerLetterId], "Offer letter ID does not exist");

        OfferLetter memory offerLetter = offerLetters[offerLetterId];
        return (
            offerLetter.employer,
            offerLetter.candidate,
            offerLetter.salary,
            offerLetter.position,
            offerLetter.date,
            offerLetter.offerHash,
            offerLetter.uniqueURL
        );
    }

    function verifyOfferHash(string memory offerLetterId, string memory offerHash) public view returns (bool) {
        require(offerLetterExists[offerLetterId], "Offer letter ID does not exist");

        OfferLetter memory offerLetter = offerLetters[offerLetterId];
        return (keccak256(abi.encodePacked(offerLetter.offerHash)) == keccak256(abi.encodePacked(offerHash)));
    }

    function toHexString(bytes32 data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(64);
        for (uint256 i = 0; i < 32; i++) {
            str[i * 2] = alphabet[uint8(data[i] >> 4)];
            str[1 + i * 2] = alphabet[uint8(data[i] & 0x0f)];
        }
        return string(str);
    }
}