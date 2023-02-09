// The contract imports the AggregatorV3Interface from the Chainlink library, which will be used to fetch the MATIC/USD price from a Chainlink price feed.
// The contract declares several variables, including the owner of the contract, the upload fee, and the address of the Chainlink price feed. It also declares a mapping data structure to store information about the files that users have uploaded.
// The contract defines a struct called "File" which contains the name, size, URI, and upload date of a file.
// The contract has a constructor function that is called when the contract is deployed. It takes in the address of the Chainlink price feed as an argument and assigns it to the priceFeedAddress variable. The msg.sender, who deploys the contract, is assigned as the owner.
// The contract has a "onlyOwner" modifier that requires the msg.sender to be the contract owner before executing the following function.
// The contract has a "setListingFee" function that allows the owner to set a new upload fee in USD. This function calls the "getMaticUsdPrice" function to convert the fee from USD to MATIC using the Chainlink price feed.
// The contract has a "getListingFee" function that returns the current upload fee.
// The contract has a "getMaticUsdPrice" function that fetches the MATIC/USD price from the Chainlink price feed and returns the price and the number of decimals.
// The contract has an "uploadFile" function that allows users to upload a file by sending the required fee to the contract. It takes in the name, size, and URI of the file as arguments and creates a new "File" struct with this information. The function then adds the file to the mapping data structure for the user and emits a "FileAdded" event. It also transfer
// the upload fee to the contract owner.
// The contract has a "getUserFiles" function that allows users to view the files they have uploaded. The function takes in an address as an argument and returns the array of files that the user has uploaded. The function also checks that the msg.sender is the same as the user address passed in as an argument

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// using chainlink price feed for matic/usd price
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FileStorage {
    address payable public owner;
    uint256 public uploadFee;
    address public priceFeedAddress;

    mapping(address => File[]) public usersFiles;

    event FileAdded(address indexed user, string fileName);

    struct File {
        string name;
        uint256 size;
        string uri;
        uint256 uploadDate;
    }

    constructor(address _priceFeedAddress) {
        priceFeedAddress = _priceFeedAddress;
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can use this");
        _;
    }

    // allow owner to set new listing fee in $
    // fee is automatically converted from $ to MATIC using chainlink price feed
    function setListingFee(uint256 _fee) public onlyOwner {
        (uint256 price, uint256 decimals) = getMaticUsdPrice();
        uploadFee = (_fee * 10**decimals) / price;
    }

    function getListingFee() public view returns (uint256) {
        return uploadFee;
    }

    // Get matic/usd price from chainlink price feed
    function getMaticUsdPrice() internal returns (uint256, uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            priceFeedAddress
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        uint256 decimals = priceFeed.decimals();
        return (uint256(price), decimals);
    }

    function uploadFile(
        string memory _name,
        uint256 _size,
        string memory fileURI
    ) public payable {
        require(
            msg.value == uploadFee,
            "To upload file you need to pay the fee"
        );

        File memory newFile = File(_name, _size, fileURI, block.timestamp);
        usersFiles[msg.sender].push(newFile);

        emit FileAdded(msg.sender, _name);

        // pay owner upload fee
        owner.transfer(msg.value);
    }

    // view function to return all user uploaded files
    function getUserFiles(address _user) public view returns (File[] memory) {
        require(msg.sender == _user, "only user can check his own files");
        return usersFiles[_user];
    }
}
