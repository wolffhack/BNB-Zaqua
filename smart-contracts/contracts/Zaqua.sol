// SPDX-License-Identifier: MIT
    pragma solidity 0.8.24;

/**
 * @title Zaqua
 * @dev A smart contract for manaaging attestators, donators and scientist with donation functionality.
 * @author Soft-law Team.
 */
contract Zaqua {
    // Access levels for users
    enum AccessLevel {
        None,
        Scientist,
        Attestator,
        Owner
    }

    address public owner;
    mapping(address => AccessLevel) public s_accessLevels;
    mapping(uint => bool) public s_completedCases;

    struct Attestator {
        uint id;
        string name;
        string location;
        bool isValidated;
    }

    event AttestatorCreated(address attestator);
    event AttestatorValidated(address attestator);
    event AttestatorAdded(address attestator);
    event AttestatorRemoved(address attestator);

    mapping(address => Attestator) public s_attestators;

    struct Scientist {
        string licenseNumber;
        string name;
        string location;
        string speciality;
        bool isValidated;
    }

    event ScientistRemoved(address scientist);
    event ScientistAdded(address scienntist);
    event ScientistCreated(address scientist);
    event ScientistValidated(address scientist);

    mapping(address => Scientist) public s_scientists;

    struct Case {
        uint caseNumber;
        string location;
        uint price;
        string description;
        bool isValidated;
        uint totalDonations;
        address scientistAddress;
        bool isFunded;
    }

    event CaseCreated(address juster, uint caseNumber);
    event CaseValidated(uint caseNumber);
    event DonationReceived(address donor, uint caseNumber, uint amount);

    mapping(uint => bool) public s_usedCaseNumbers;
    mapping(uint => Case) public s_cases;

    /**
     * @dev Contract constructor, sets the contract owner.
     */
    constructor() {
        owner = msg.sender;
        s_accessLevels[owner] = AccessLevel.Owner;
    }

    /**
     * @dev Modifier to restrict function access to the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    /**
     * @dev Modifier to restrict function access to attestators only.
     */
    modifier onlyAttestator() {
        require(
            getAccessLevel(msg.sender) == AccessLevel.Attestator,
            "Only Attestator"
        );
        _;
    }

    /**
     * @dev Modifier to restrict function access to scientist only.
     */
    modifier onlyScientist() {
        require(
            getAccessLevel(msg.sender) == AccessLevel.Scientist,
            "Only Scientist"
        );
        _;
    }

    /**
     * @dev Gets the access level of an account.
     * @param account The address to query the access level.
     * @return The access level of the account.
     */
    function getAccessLevel(address account) public view returns (AccessLevel) {
        return s_accessLevels[account];
    }

    /**
     * @dev Checks if an address belongs to an  attestator.
     * @param _attestatorAddress The address to check.
     * @return A boolean indicating whether the address belongs to an attestator.
     */
    function isAttestator(address _attestatorAddress) internal view returns (bool) {
        return s_accessLevels[_attestatorAddress] == AccessLevel.Attestator;
    }

    /**
     * @dev Checks if an address belongs to a scientist.
     * @param _scientistAddress The address to check.
     * @return A boolean indicating whether the address belongs to a scientist.
     */
    function isScientist(address _scientistAddress) internal view returns (bool) {
        return s_accessLevels[_scientistAddress] == AccessLevel.Scientist;
    }

    /**
     * @dev Removes an attestator from the system.
     * @param _attestatorAddress The address of the attestator to be removed.
     */
    function delAttestator(address _attestatorAddress) public onlyOwner {
        s_accessLevels[_attestatorAddress] = AccessLevel.None;
        s_attestators[_attestatorAddress].isValidated = false;

        emit AttestatorRemoved(_attestatorAddress);
    }

    /**
     * @dev Adds an Attestator to the system.
     * @param _attestatorAddress The address of the attestator to be added.
     */
    function addAttestator(address _attestatorAddress) public onlyOwner {
        s_accessLevels[_attestatorAddress] = AccessLevel.Attestator;
        emit AttestatorAdded(_attestatorAddress);
    }

    /**
     * @dev Creates a new attestator in the system.
     * @param _id The id of the attestator.
     * @param _name The name of the attestator.
     * @param _location The location of the attestator.
     */
    function createAttestator(
        uint _id,
        string memory _name,
        string memory _location
    ) public {
        require(!s_attestators[msg.sender].isValidated, "Attestator already exists");

        Attestator memory newAttestator = Attestator({
            id: _id,
            name: _name,
            location: _location,
            isValidated: false
        });

        s_attestators[msg.sender] = newAttestator;
        emit AttestatorCreated(msg.sender);
    }

    /**
     * @dev Validates an attestator, granting them access rights.
     * @param _attestatorAddress The address of the attestator to be validated.
     */
    function validateAttestator(address _attestatorAddress) public onlyOwner {
        require(
            !s_attestators[_attestatorAddress].isValidated,
            "Attestator is already validated"
        );
        s_accessLevels[_attestatorAddress] = AccessLevel.Attestator;
        s_attestators[_attestatorAddress].isValidated = true;
        emit AttestatorValidated(_attestatorAddress);
    }

    /**
     * @dev Creates a new scientist in the system.
     * @param _licenseNumber The license number of the scientist.
     * @param _name The name of the scientist.
     * @param _location The jurisdiction of the location.
     * @param _speciality The speciality of the scientist.
     */
    function createScientist(
        string memory _licenseNumber,
        string memory _name,
        string memory _location,
        string memory _speciality
    ) public {
        require(!s_scientists[msg.sender].isValidated, "Scientist already exists");

        Scientist memory newScientist = Scientist({
            licenseNumber: _licenseNumber,
            name: _name,
            location: _location,
            speciality: _speciality,
            isValidated: false
        });

        s_scientists[msg.sender] = newScientist;
        emit ScientistCreated(msg.sender);
    }

    /**
     * @dev Validates a scientist, granting them access rights.
     * @param _scientistAddress The address of the scientist to be validated.
     */
    function validateScientist(address _scientistAddress) public onlyScientist {
        require(
            !s_scientists[_scientistAddress].isValidated,
            "Scientist is already validated"
        );

        s_scientists[_scientistAddress].isValidated = true;
        s_accessLevels[_scientistAddress] = AccessLevel.Scientist;
        emit ScientistValidated(_scientistAddress);
    }

    /**
     * @dev Creates a new funding case in the system.
     * @param _caseNumber The number of the funding case.
     * @param _location The location of the funding case.
     * @param _price The price of the fundig case.
     * @param _description The description of the funding case.
     */
    function createCase(
        uint _caseNumber,
        string memory _location,
        uint _price,
        string memory _description
    ) public onlyScientist {
        require(!s_usedCaseNumbers[_caseNumber], "Case number already used");

        Case memory newCase = Case({
            caseNumber: _caseNumber,
            location: _location,
            price: _price,
            description: _description,
            isValidated: false,
            totalDonations: 0,
            scientistAddress: msg.sender,
            isFunded: false
        });

        s_cases[_caseNumber] = newCase;
        s_usedCaseNumbers[_caseNumber] = true;

        emit CaseCreated(msg.sender, _caseNumber);
    }

    /**
     * @dev Validates a funding case, granting it access rights.
     * @param _caseNumber The number of the funding case to be validated.
     */
    function validateCase(uint _caseNumber) public onlyAttestator {
        require(s_usedCaseNumbers[_caseNumber], "Case number does not exist");
        require(!s_cases[_caseNumber].isValidated, "Case is already validated");

        s_cases[_caseNumber].isValidated = true;
        emit CaseValidated(_caseNumber);
    }

    /**
     * @dev Allows a donor to contribute funds to a scientist case.
     * @param _caseNumber The number of the funding case to receive the donation.
     */
    function donateToCase(uint _caseNumber) public payable returns (bool) {
        require(s_usedCaseNumbers[_caseNumber], "Case number does not exist");
        require(s_cases[_caseNumber].isValidated, "Case is not validated");

        uint remainingAmount = s_cases[_caseNumber].price -
            s_cases[_caseNumber].totalDonations;

        // Convert donation amount to ether
        uint donationAmountInWei = msg.value;
        uint donationAmountInEther = donationAmountInWei / 1 ether;

        require(
            donationAmountInEther > 0 &&
                donationAmountInEther <= remainingAmount,
            "Invalid donation amount"
        );
        emit DonationReceived(msg.sender, _caseNumber, donationAmountInEther);

        s_cases[_caseNumber].totalDonations += donationAmountInEther;

        if (s_cases[_caseNumber].totalDonations >= s_cases[_caseNumber].price) {
            // Mark the case as funded
            s_completedCases[_caseNumber] = true;
        }

        if (s_cases[_caseNumber].totalDonations >= s_cases[_caseNumber].price) {
            // Mark the case as funded inside case struct
            s_cases[_caseNumber].isFunded = true;
        }

        return true;
    }

    /**
     * @dev Allows the assigned scientist to withdraw funds from a fully funded sciense case.
     * @param _caseNumber The number of the science case to withdraw funds from.
     */
    function withdrawFunds(uint _caseNumber) public onlyScientist returns (bool) {
        require(s_completedCases[_caseNumber], "Case is not fully funded");

        // Ensure the Scientist's address is valid before transferring funds
        require(
            msg.sender == s_cases[_caseNumber].scientistAddress,
            "Only assigned Scientist can withdraw funds"
        );

        payable(s_cases[_caseNumber].scientistAddress).transfer(
            s_cases[_caseNumber].totalDonations * 1 ether
        );

        // Remove the case from active cases
        s_usedCaseNumbers[_caseNumber] = false;

        // Return true indicating successful withdrawal
        return true;
    }

    /**
     * @dev Gets the completion status of a science case.
     * @param _caseNumber The number of the science case.
     * @return A boolean indicating whether the case is completed (fully funded).
     */
    function getCompletedCases(uint _caseNumber) public view returns (bool) {
        return s_completedCases[_caseNumber];
    }

    /**
     * @dev Get details of a Attestator.
     * @param _attestatorAddress The address of the attestator.
     * @return id The id number of the attestator.
     * @return name The name of the attestator.
     * @return location The location of the attestator.
     * @return isValidated A boolean indicating whether the attestator is validated.
     */
    function getAttestator(
        address _attestatorAddress
    )
        public
        view
        returns (
            uint id,
            string memory name,
            string memory location,
            bool isValidated
        )
    {
        Attestator memory attestator = s_attestators[_attestatorAddress];
        return (
            attestator.id,
            attestator.name,
            attestator.location,
            attestator.isValidated
        );
    }

    /**
     * @dev Get details of a scientist.
    * @param _scientistAddress The address of the scientist.
     * @return licenseNumber The license number of the scientist.
     * @return name The name of the scientist.
     * @return location The location of the scientist.
     * @return speciality The speciality of the scientist
     * @return isValidated A boolean indicating whether the scientist is validated.
     */
    function getScientist(
        address _scientistAddress
    )
        public
        view
        returns (
            string memory licenseNumber,
            string memory name,
            string memory location,
            string memory speciality,
            bool isValidated
        )
    {
        Scientist memory scientist = s_scientists[_scientistAddress];
        return (
            scientist.licenseNumber,
            scientist.name,
            scientist.location,
            scientist.speciality,
            scientist.isValidated
        );
    }

    /**
     * @dev Get the owner of the contract.
     * @return The address of the contract owner.
     */
    function getContractOwner() public view returns (address) {
        return owner;
    }

    /**
     * @dev Check if a case number is used.
     * @param _caseNumber The number of the science funding case.
     * @return A boolean indicating whether the case number is used.
     */
    function isCaseUsed(uint _caseNumber) public view returns (bool) {
        return s_usedCaseNumbers[_caseNumber];
    }

    /**
     * @dev Get detailed information about a science funding case.
     * @param _caseNumber The number of the science funding case.
     * @return location The location of the science funding case.
     * @return price The price of the science funding case.
     * @return description The description of the science funding case.
     * @return isValidated A boolean indicating whether the science funding case is validated.
     * @return totalDonations The total donations received for the science funding case.
     * @return scientistAddress The address of the assigned juster for the science funding case.
     * @return isFunded A boolean indicating whether the science case is funded.
     */
    function getCaseDetails(
        uint _caseNumber
    )
        public
        view
        returns (
            string memory location,
            uint price,
            string memory description,
            bool isValidated,
            uint totalDonations,
            address scientistAddress,
            bool isFunded
        )
    {
        Case memory scienceCase = s_cases[_caseNumber];
        return (
            scienceCase.location,
            scienceCase.price,
            scienceCase.description,
            scienceCase.isValidated,
            scienceCase.totalDonations,
            scienceCase.scientistAddress,
            scienceCase.isFunded
        );
    }
}