pragma solidity 0.6.10;

interface IERC20CRV {
    // public variables

    function name() external view returns (string);

    function symbol() external view returns (string);

    function decimals() external view returns (uint256);

    function minter() external view returns (address);

    function admin() external view returns (address);

    function mining_epoch() external view returns (int128);

    function start_epoch_time() external view returns (uint256);

    function rate() external view returns (uint256);

    // getter functions

    function available_supply() external view returns (uint256);

    function totalSupply() external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    // external functions

    function update_mining_parameters() external;

    function start_epoch_time_write() external returns (uint256);

    function future_epoch_time_write() external returns (uint256);

    function set_minter(address) external;

    function set_admin(address) external;

    function transfer(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function mint(address, uint256) external returns (bool);

    function burn(uint256) external returns (bool);

    function set_name(string, string) external;
}
