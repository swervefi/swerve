pragma solidity 0.6.10;

interface IPoolProxy {
    // public variables

    function ownership_admin() external view returns (address);

    function parameter_admin() external view returns (address);

    function emergency_admin() external view returns (address);

    function future_ownership_admin() external view returns (address);

    function future_parameter_admin() external view returns (address);

    function future_emergency_admin() external view returns (address);

    function burners(address) external view returns (address);

    // external functions

    function commit_set_admins(
        address,
        address,
        address
    ) external;

    function apply_set_admins() external;

    function set_burner(address, address) external;

    function withdraw_admin_fees(address) external;

    function burn(address) external;

    function burn_coin(address) external;

    function burn_eth() external;

    function kill_me(address) external;

    function unkill_me(address, address) external;

    function commit_transfer_ownership(address, address) external;

    function apply_transfer_ownership(address) external;

    function revert_transfer_ownership(address) external;

    function commit_new_parameters(
        address,
        uint256,
        uint256,
        uint256
    ) external;

    function apply_new_parameters(address) external;

    function revert_new_parameters(address) external;

    function commit_new_fee(
        address,
        uint256,
        uint256
    ) external;

    function apply_new_fee(address) external;

    function ramp_A(
        address,
        uint256,
        uint256
    ) external;

    function stop_ramp_A(address) external;

    function set_aave_referral(address, uint256) external;

    function donate_admin_fees(address) external;
}
