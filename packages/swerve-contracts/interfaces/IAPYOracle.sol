pragma solidity 0.6.10;

interface IAPYOracle {
    function pool() external view returns (address);

    function poolDeployBlock() external view returns (uint256);

    function getAPY() external view returns (uint256);
}
