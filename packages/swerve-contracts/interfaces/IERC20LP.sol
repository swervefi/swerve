pragma solidity 0.6.10;

interface IERC20LP {
    // public variables

    function name() external view returns (string);

    function symbol() external view returns (string);

    function decimals() external view returns (uint256);

    // getter functions

    function balanceOf(address) external view returns (uint256);

    function totalSupply() external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    // external functions

    function set_minter(address) external;

    function transfer(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function mint(address, uint256) external;

    function burn(uint256) external;

    function burnFrom(uint256) external;
}
