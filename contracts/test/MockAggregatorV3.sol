// This is a Solidity smart contract called "MockV3Aggregator" that is used to mock the functionality of a Chainlink aggregator contract. It implements the AggregatorV2V3Interface from the Chainlink library and allows for testing of other contracts that interact with an aggregator contract.

// The contract imports the AggregatorV2V3Interface from the Chainlink library.
// The contract declares several public variables, including the version of the contract, the number of decimals, the latest answer, the latest timestamp, and the latest round. It also declares two mapping data structures to store answers and timestamps for each round.
// The contract has a constructor function that takes in the number of decimals and an initial answer as arguments. It sets the decimals variable and calls the "updateAnswer" function to set the initial answer.
// The contract has an "updateAnswer" function that allows the contract owner to update the latest answer, timestamp, and round. It updates the values of the corresponding variables and stores the answer and timestamp in the mapping data structures.
// The contract has an "updateRoundData" function that allows the contract owner to update the data for a specific round. It takes in a round ID, answer, timestamp, and startedAt timestamp as arguments.
// The contract has a "getRoundData" function that allows anyone to view the data for a specific round. It takes in a round ID as an argument and returns the answer, startedAt timestamp, updatedAt timestamp, and round ID.
// The contract has a "latestRoundData" function that allows anyone to view the data for the latest round. It returns the latest answer, startedAt timestamp, updatedAt timestamp, and round ID.
// The contract has a "description" function that returns a string describing the contract.

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV2V3Interface.sol";

/**
 * @title MockV3Aggregator
 * @notice Based on the FluxAggregator contract
 * @notice Use this contract when you need to test
 * other contract's ability to read data from an
 * aggregator contract, but how the aggregator got
 * its answer is unimportant
 */
contract MockV3Aggregator is AggregatorV2V3Interface {
    uint256 public constant override version = 0;

    uint8 public override decimals;
    int256 public override latestAnswer;
    uint256 public override latestTimestamp;
    uint256 public override latestRound;

    mapping(uint256 => int256) public override getAnswer;
    mapping(uint256 => uint256) public override getTimestamp;
    mapping(uint256 => uint256) private getStartedAt;

    constructor(uint8 _decimals, int256 _initialAnswer) public {
        decimals = _decimals;
        updateAnswer(_initialAnswer);
    }

    function updateAnswer(int256 _answer) public {
        latestAnswer = _answer;
        latestTimestamp = block.timestamp;
        latestRound++;
        getAnswer[latestRound] = _answer;
        getTimestamp[latestRound] = block.timestamp;
        getStartedAt[latestRound] = block.timestamp;
    }

    function updateRoundData(
        uint80 _roundId,
        int256 _answer,
        uint256 _timestamp,
        uint256 _startedAt
    ) public {
        latestRound = _roundId;
        latestAnswer = _answer;
        latestTimestamp = _timestamp;
        getAnswer[latestRound] = _answer;
        getTimestamp[latestRound] = _timestamp;
        getStartedAt[latestRound] = _startedAt;
    }

    function getRoundData(uint80 _roundId)
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            _roundId,
            getAnswer[_roundId],
            getStartedAt[_roundId],
            getTimestamp[_roundId],
            _roundId
        );
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (
            uint80(latestRound),
            getAnswer[latestRound],
            getStartedAt[latestRound],
            getTimestamp[latestRound],
            uint80(latestRound)
        );
    }

    function description() external view override returns (string memory) {
        return "v0.6/tests/MockV3Aggregator.sol";
    }
}
