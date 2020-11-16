pragma solidity 0.6.10;
pragma experimental ABIEncoderV2;

interface IVotingEscrow {
    struct Point {
        int128 bias;
        int128 slope; // - dweight / dt
        uint256 ts;
        uint256 blk; // block
    }

    struct LockedBalance {
        int128 amount;
        uint256 end;
    }

    // public variables

    function token() external view returns (address);

    function supply() external view returns (uint256);

    function locked(address) external view returns (LockedBalance memory);

    function epoch() external view returns (uint256);

    function point_history(uint256) external view returns (Point memory);

    function user_point_history(address, uint256)
        external
        view
        returns (Point memory);

    function user_point_epoch(address) external view returns (uint256);

    function slope_changes(uint256) external view returns (int128);

    function controller() external view returns (address);

    function transfersEnabled() external view returns (bool);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function version() external view returns (string memory);

    function decimals() external view returns (uint256);

    function admin() external view returns (address);

    function future_admin() external view returns (address);

    // getter functions

    function get_last_user_slope(address) external view returns (int128);

    function user_point_history__ts(address, uint256)
        external
        view
        returns (uint256);

    function locked__end(address) external view returns (uint256);

    function balanceOf(address, uint256) external view returns (uint256);

    function balanceOfAt(address, uint256) external view returns (uint256);

    function totalSupply(uint256) external view returns (uint256);

    function totalSupplyAt(uint256) external view returns (uint256);

    // external functions

    function commit_transfer_ownership(address) external;

    function apply_transfer_ownership() external;

    function checkpoint() external;

    function deposit_for(address, uint256) external;

    function create_lock(uint256, uint256) external;

    function increase_amount(uint256) external;

    function increase_unlock_time(uint256) external;

    function withdraw() external;

    function changeController(address) external;
}
