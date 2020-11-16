pragma solidity 0.6.10;
pragma experimental ABIEncoderV2;

interface ItSWRV {
    struct Grant {
        address recipient;
        uint256 amount;
        uint256 bonus;
        uint256 redemptionDate;
    }
    enum TimelockedFunctions {CHGOWNERSHIP, SETSUBCOM}

    function owner() external view returns (address);

    function subcommitteeAddress() external view returns (address);

    function swUSD() external view returns (address);

    function _TIMELOCK() external view returns (uint256);

    function timelockTimer(uint256) external view returns (uint256);

    function grants(uint256) external view returns (Grant memory);

    function counter() external view returns (uint256);

    function getTreasuryBalance() external view returns (uint256);

    // owner functions

    function unlockFunction(TimelockedFunctions _fn) external;

    function lockFunction(TimelockedFunctions _fn) external;

    function setSubcommitteeAddress(address) external;

    function transferOwnership(address) external;

    function mint(uint256) external;

    // public functions

    function createGrant(
        address,
        uint256,
        uint256,
        uint256
    ) external;

    function createScheduledGrants(
        address,
        uint256[] memory,
        uint256[] memory,
        uint256[] memory
    ) external;

    function redeem(uint256, uint256) external;
}
