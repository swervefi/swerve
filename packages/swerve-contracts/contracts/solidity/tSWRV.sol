pragma solidity 0.6.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @dev Implementation of the SIP-12 : "tSWRV - Treasury Promissory Tokens".
 *
 * This implementation uses the ERC-20 standard but limits the minting function by making it callable
 * only by the contract owner, and with the subcommittee as the only recipient.
 * The token transfer functionality is restricted to the subcommittee only as part of
 * a grant creation.
 * Non-committee tokenholders can only use their tokens in order to redeem them for
 * swUSD tokens according to grant parameters.
 * These limitations require making standard "transfer" and "transferFrom" functions
 * unusable by overriding them.
 *
 * Normal flow of operations :
 * - contract is deployed and treasury multisig is nominated as owner
 * - multisig treasury owner nominates the subcommittee address
 * - multisig treasury funds the contract with swUSD and mints tSWRV tokens
 * - subcommittee creates grants as per decisions of the community
 * - grant recipients redeem tSWRV tokens for swUSD
 *
 * Grants are created with a unique ID and can be tailored according to four parameters :
 * recipient (address), amount of tSWRV tokens (uint256), swUSD redemption bonus percentage (uint256),
 * redemption delay after grant creation in seconds (uint256).
 * Once a grant's amount has been fully redeemed, its data is deleted to save on storage space.
 *
 * The contract owner address and the subcommittee address can be changed,
 * but these functions are under a 48-hour timelock tracked by the event
 * FunctionUnlockStarted, whose first output is the date of starting the unlock
 * process, while the second output indicates which function is being unlocked
 * (0 for transferOwnership, 1 for setSubcommitteeAddress).
 * The timelock follows the model described in : https://medium.com/cryptexglobal/how-to-create-time-locked-functions-523424def80
 *
 * Written and tested by Fairly Rare Pepe
 *
 */

contract tSWRV is ERC20 {
    using SafeMath for uint256;

    // storage variables

    address public owner;
    address public subcommitteeAddress;
    IERC20 public swUSD;
    uint256 public _TIMELOCK;
    mapping(TimelockedFunctions => uint256) public timelockTimer;
    mapping(uint256 => Grant) public grants;
    enum TimelockedFunctions {CHGOWNERSHIP, SETSUBCOM}
    struct Grant {
        address recipient;
        uint256 amount;
        uint256 bonus;
        uint256 redemptionDate;
    }
    uint256 public counter;

    // modifiers

    /**
     * @dev Throws if called by any account other than the owner.
     */

    modifier onlyOwner() {
        require(owner == _msgSender(), "Caller is not the owner");
        _;
    }

    /**
     * @dev Throws if function is called when the unlocking procedure hasn't started or
     * when the timelock is not yet expired.
     * @param _fn refers to the TimelockedFunctions enum, whereby 0 points to the
     * transferOwnership function while 1 points to the setSubcommitteeAddress
     * function.
     */

    modifier notLocked(TimelockedFunctions _fn) {
        require(
            timelockTimer[_fn] != 0 && timelockTimer[_fn] <= block.timestamp,
            "Function is timelocked"
        );
        _;
    }

    // events

    event PromissoryTokensMinted(uint256 date, uint256 _amount);
    event GrantCreated(
        uint256 date,
        uint256 _grantID,
        address _recipient,
        uint256 _amount,
        uint256 _bonusPercentage,
        uint256 _redemptionDelay
    );
    event PromissoryTokensRedeemed(
        uint256 date,
        uint256 grantID,
        address _beneficiary,
        uint256 _amount,
        uint256 payout
    );
    event OwnershipTransferred(
        uint256 date,
        address _previousOwner,
        address _newOwner
    );
    event SubcommitteeAddressChanged(
        uint256 date,
        address _previousSubcommittee,
        address _newSubcommittee
    );
    event FunctionUnlockStarted(uint256 date, TimelockedFunctions _fn);
    event FunctionLocked(uint256 date, TimelockedFunctions _fn);

    /**
     * @dev Sets the values for {_TIMELOCK} with
     * a default value of 2 days, initializes the counter used for
     * grantIDs as 0 and swUSD as the only payment token for grants.
     *
     * {_TIMELOCK} and the swUSD address values are immutable: they can only be set once during
     * construction.
     *
     * The value for {owner} is set to the deploying address, but can be later changed
     * with the transferOwnership function.
     */

    // constructor

    constructor() public ERC20("Swerve Treasury Promissory Token", "tSWRV") {
        owner = 0x1137952818D5887d9af44995055723967C78B3bb; // treasury multisig address as per announcement in sip-2-treasury channel
        _TIMELOCK = 2 days;
        swUSD = IERC20(0x77C6E4a580c0dCE4E5c7a17d0bc077188a83A059); // current swUSD address as per https://swerve.fi/contracts/
        counter = 0;
        emit OwnershipTransferred(now, address(0), _msgSender());
    }

    // getter functions

    /**
     * @dev Returns the contract's swUSD balance.
     */

    function getTreasuryBalance() public view returns (uint256) {
        return swUSD.balanceOf(address(this));
    }

    // owner functions

    /**
     * @dev Starts the unlocking procedure for a timelocked function. Can only
     * be called by contract owner.
     * @param _fn refers to the TimelockedFunctions enum, whereby 0 points to the
     * transferOwnership function while 1 points to the setSubcommitteeAddress
     * function.
     *
     * Emits a {FunctionUnlockStarted} event that can be tracked to monitor the
     * unlocking of critical functions.
     */

    function unlockFunction(TimelockedFunctions _fn) public onlyOwner {
        timelockTimer[_fn] = block.timestamp + _TIMELOCK;
        emit FunctionUnlockStarted(now, _fn);
    }

    /**
     * @dev Cancels the unlocking procedure for a timelocked function after it
     * has been started by the contract owner. Can only be called by contract owner.
     * @param _fn refers to the TimelockedFunctions enum, whereby 0 points to the
     * transferOwnership function while 1 points to the setSubcommitteeAddress
     * function.
     *
     * Emits a {FunctionLocked} event that can be tracked to confirm that the
     * unlocking of a critical functions has been cancelled.
     */

    function lockFunction(TimelockedFunctions _fn) public onlyOwner {
        timelockTimer[_fn] = 0;
        emit FunctionLocked(now, _fn);
    }

    /**
     * @dev Sets the {_subcommitteAddress} in charge of creating grants. Can only be
     * called by contract owner and is under a timelock.
     * @param _subcommitteAddress refers to the address of the new subcommittee.
     *
     * Emits a {SubcommitteeAddressChanged} event displaying the time of change, the
     * previous subcommittee address and the new subcommittee address.
     */

    function setSubcommitteeAddress(address _subcommitteAddress)
        public
        onlyOwner
        notLocked(TimelockedFunctions.SETSUBCOM)
    {
        require(
            _subcommitteAddress != address(0),
            "Subcommittee cannot be the zero address"
        );
        emit SubcommitteeAddressChanged(
            now,
            subcommitteeAddress,
            _subcommitteAddress
        );
        subcommitteeAddress = _subcommitteAddress;
        timelockTimer[TimelockedFunctions.SETSUBCOM] = 0;
    }

    /**
     * @dev Sets the {owner} in charge of minting tSWRV tokens and nominating the
     * subcommittee address. Can only be called by contract owner and is under a timelock.
     * @param _newOwner  refers to the address of the new contract owner.
     *
     * Emits a {OwnershipTransferred} event displaying the time of change, the
     * previous owner address and the new owner address.
     */

    function transferOwnership(address _newOwner)
        public
        onlyOwner
        notLocked(TimelockedFunctions.CHGOWNERSHIP)
    {
        require(
            _newOwner != address(0),
            "New owner cannot be the zero address"
        );
        owner = _newOwner;
        timelockTimer[TimelockedFunctions.CHGOWNERSHIP] = 0;
        emit OwnershipTransferred(now, owner, _newOwner);
    }

    /**
     * @dev Mints the indicated {_amount} of tSWRV tokens in favor of the subcommittee address.
     * Can only be called by contract owner and is under a timelock.
     * @param _amount refers to amount of new tSWRV tokens to mint, taking into account the 18
     * decimals default parameter of the token.
     *
     * Emits a {PromissoryTokensMinted} event displaying the time of minting and the
     * amount of minted tokens.
     */

    function mint(uint256 _amount) public onlyOwner {
        require(_amount > 0, "Amount cannot be zero");
        _mint(subcommitteeAddress, _amount);
        emit PromissoryTokensMinted(now, _amount);
    }

    // public functions

    /**
     * @dev Creates a new {Grant} struct inside the {grants} mapping with a unique grantID pointing to a grant recipient's address,
     * the tSWRV amount to be transferred, the bonus percentage at redemption and the redemption delay.
     * The function can only be called by the subcommittee address.
     * The function uses the current value of the {counter} variable to assign a unique grantID to the grant, then populates the
     * {Grant} struct with the given parameters.
     * The {counter} variable is then incremented for the next grant and the tSWRV amount is transferred from the subcommittee address's balance
     * to the grant recipient address's balance.
     *
     * @param _recipient refers to the address of the grant recipient. THIS ADDRESS MUST BE CAPABLE OF CALLING THE redeem FUNCTION,
     * otherwise the tSWRV tokens cannot be redeemed and the grant recipient cannot be compensated from the contract's swUSD funds.
     * @param _amount refers to amount of tSWRV tokens held by the subcommittee to be transferred to the grant recipient, taking into
     * account the 18 decimals default parameter of the token.
     * @param _bonusPercentage refers to the percentage (5 --> 5%) added to the base swUSD value of the grant at the time of redeeming
     * tSWRV tokens for swUSD, e.g. a 1000 tSWRV grant with a 5% bonus percentage will be redeemable for 1050 swUSD.
     * @param _redemptionDelay refers to the time in seconds after the creation of the grant that will need to pass before the grant
     * recipient can redeem his tSWRV tokens for swUSD.
     *
     * Emits a {GrantCreated} event displaying the time of minting, the grant ID, the grant recipient,
     * the amount of transferred tokens, the chosen bonus percentage and the redemption delay of the grant.
     */

    function createGrant(
        address _recipient,
        uint256 _amount,
        uint256 _bonusPercentage,
        uint256 _redemptionDelay
    ) public {
        require(
            _msgSender() == subcommitteeAddress,
            "Only the subcommittee can create a grant"
        );
        require(_amount > 0, "Amount cannot be zero");

        grants[counter].recipient = _recipient;
        grants[counter].amount = _amount;
        grants[counter].bonus = _bonusPercentage;
        grants[counter].redemptionDate = block.timestamp + _redemptionDelay;
        counter++;
        _transfer(subcommitteeAddress, _recipient, _amount);

        emit GrantCreated(
            block.timestamp,
            counter,
            _recipient,
            _amount,
            _bonusPercentage,
            _redemptionDelay
        );
    }

    /**
     * @dev Creates several new {Grant} structs inside the {grants} mapping with unique grantIDs pointing to a single grant recipient's address,
     * the tSWRV amounts to be transferred, the bonus percentages at redemption and the redemption delays. This convenience function makes it
     * easier to create a series of grants for recurring payments to a grant recipient, such as a team employee.
     * The function can only be called by the subcommittee address.
     * All input arrays must be of the same length or the function will revert. The function loops over the alength of the rrays and calls the createGrant
     * function incrementally for each of the array indexes.
     *
     * @param _recipient refers to the address of the grant recipient. THIS ADDRESS MUST BE CAPABLE OF CALLING THE redeem FUNCTION,
     * otherwise the tSWRV tokens cannot be redeemed and the grant recipient cannot be compensated from the contract's swUSD funds.
     * @param _amounts refers to an array of amounts of tSWRV tokens held by the subcommittee to be transferred to the grant recipient, taking into
     * account the 18 decimals default parameter of the token.
     * @param _bonusPercentages refers to an array of percentages (5 --> 5%) added to the base swUSD value of the grant at the time of redeeming
     * tSWRV tokens for swUSD, e.g. a 1000 tSWRV grant with a 5% bonus percentage will be redeemable for 1050 swUSD.
     * @param _redemptionDelays refers to an array of times in seconds after the creation of the grant that will need to pass before the grant
     * recipient can redeem his tSWRV tokens for swUSD.
     *
     *
     * Emits a {GrantCreated} event displaying the time of minting, the grant ID, the grant recipient,
     * the amount of transferred tokens, the chosen bonus percentage and the redemption delay of the grant.
     */

    function createScheduledGrants(
        address _recipient,
        uint256[] memory _amounts,
        uint256[] memory _bonusPercentages,
        uint256[] memory _redemptionDelays
    ) public {
        require(
            _msgSender() == subcommitteeAddress,
            "Only the subcommittee can create a grant"
        );
        require(
            _amounts.length == _bonusPercentages.length,
            "All arrays must be of the same length"
        );
        require(
            _redemptionDelays.length == _bonusPercentages.length,
            "All arrays must be of the same length"
        );

        for (uint256 i = 0; i < _amounts.length; i++) {
            require(_amounts[i] > 0, "Amount cannot be zero");
            createGrant(
                _recipient,
                _amounts[i],
                _bonusPercentages[i],
                _redemptionDelays[i]
            );
        }
    }

    /**
     * @dev Redeems the indicated {_amount} of tSWRV tokens from the grants identified by
     * the {_grantID}. Cannot be called with a null amount, can only be called by the grant recipient
     * as per the {grants} mapping. Checks for sufficient tSWRV balance and that the redemption delays
     * has passed.
     * The function burns the redeemed tSWRV tokens and updates the {grants} mapping. Then the bonus amount
     * is calculated and added to the baseline 1 tSWRV = 1 swUSD baseline.
     * The contract's swUSD is checked then swUSD is transferred to the grant recipient.
     * Finally if the grant amount has been fully redeemed, the relevant Grant struct is deleted in the
     * {grants} mapping to save on storage space.
     *
     * @param _grantID refers to the unique number assigned to the grant at creation time as a consequence of the value
     * of the {counter} variable at that time.
     * @param _amount refers to amount of held tSWRV tokens to redeem, taking into account the 18
     * decimals default parameter of the token.
     *
     * Emits a {PromissoryTokensRedeemed} event displaying the time of minting, the grant ID, the grant recipient,
     * the amount of redeemed tokens, and the total swUSD payout sent to the recipient.
     */

    function redeem(uint256 _grantID, uint256 _amount) public {
        require(_amount > 0, "Amount cannot be zero");
        require(
            grants[_grantID].recipient == _msgSender(),
            "Only the grant recipient can redeem its tSWRV tokens"
        );
        require(
            grants[_grantID].amount >= _amount,
            "Amount requested is more than current grant amount"
        );
        require(
            grants[_grantID].redemptionDate <= block.timestamp,
            "Grant is not yet redeemable for swUSD"
        );
        _burn(_msgSender(), _amount);
        grants[_grantID].amount = grants[_grantID].amount.sub(_amount);

        uint256 bonus = _amount.mul(grants[_grantID].bonus).div(100);
        uint256 payout = _amount.add(bonus);

        require(
            getTreasuryBalance() >= payout,
            "Insufficient swUSD  balance in treasury"
        );
        swUSD.transfer(_msgSender(), payout);

        if (grants[_grantID].amount == 0) {
            delete grants[_grantID];
        }

        emit PromissoryTokensRedeemed(
            now,
            _grantID,
            _msgSender(),
            _amount,
            payout
        );
    }

    // deactivated functions from ERC-20 standard

    /**
     * @dev  Standard ERC-20 public functions are deactivated in order to respect implementation specifications
     * mentioned above. These functions are made unusable by changing the function body, they can still
     * be called but the transaction will automatically revert.
     *
     * Note : other standard ERC-20 public functions such as approve, decreaseAllowance, increaseAllowance are not
     * explicitly deactivated but are rendered useless by the deactivation of transfer and transferFrom.
     */

    function transfer(address _recipient, uint256 _amount)
        public
        override
        returns (bool)
    {
        revert();
    }

    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) public override returns (bool) {
        revert();
    }
}
