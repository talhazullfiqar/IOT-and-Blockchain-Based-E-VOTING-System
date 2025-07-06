// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract VotingSystem {
    // Admin and subadmin //
    address public immutable i_admin;
    address public immutable i_subAdmin;
    uint256 public electionYearByAdmin;

    // Counters //
    uint256 public totalVoters;
    uint256 public totalMaleVoters;
    uint256 public totalFemaleVoters;

    //  ENUMS  //

    enum Role {
        none,
        admin,
        party,
        partyCandidate
    }

    // STRUCTS //

    // Time Frame for Starting and Ending of voting
    struct TimeFrame {
        uint256 startDay;
        uint256 startMonth;
        uint256 startYear;
        uint256 startHour;
        uint256 endDay;
        uint256 endMonth;
        uint256 endYear;
        uint256 endHour;
    }

    // Data for party registration will be entered by Admin
    struct Party {
        string name;
        string leaderName;
        address leaderAddress;
        string leaderCnic;
        string flagSignName;
        string flagSignImage;
        string leaderFingerprint;
        string leaderProfilePic;
        uint256 electionYear;
        bool isRegistered;
        Role assignRole;
    }

    // Data for Candidate registration will be entered by Party
    struct Candidate {
        string name;
        string seatType;
        string constituency;
        address walletAddress;
        string partyName;
        string cnic;
        string profilePic;
        string partySignImage;
        uint256 electionYear;
        bool isRegistered;
        uint256 voteCount;
        Role assignRole;
    }

    // Data for registring voter for voting
    struct Voter {
        string firstName;
        string lastName;
        string cnic;
        string phoneNumber;
        uint256 birthYear;
        uint256 birthMonth;
        uint256 birthDay;
        string constituency;
        string gender;
        string cnicImage;
        string fingerprint;
        bool acceptedVotingTerm;
        uint256 electionYear;
        bool isRegistered;
    }

    // Data for registering INDEPENDENT CANDIDATE
    struct IndependentCandidate {
        string firstName;
        string lastName;
        string cnic;
        string phoneNumber;
        uint256 birthYear;
        uint256 birthMonth;
        uint256 birthDay;
        string constituency;
        string gender;
        string cnicImage;
        string fingerprint;
        string partyName; // Party name
        string independentCandidateAddress;
        string flagSign;
        string profileImage;
        bool acceptedVotingTerm;
        uint256 electionYear;
        bool isRegistered;
        string seatType; // Added seat type (MNA, MPA, etc.)
        uint256 voteCount;
    }

    // MAPPINGS //

    // savong roles against address
    mapping(address => Role) public roles;
    // Maps election year to its voting time
    mapping(uint256 => TimeFrame) public electionYears;
    mapping(uint256 => TimeFrame) public candidateRegistrationPeriods;
    mapping(uint256 => TimeFrame) public voterRegistrationPeriods;

    // Voter and vote tracking per year
    mapping(uint256 => uint256) public totalVotersPerYear;
    mapping(uint256 => uint256) public votesCastPerYear;

    // Registered Party Information and addresses will be stored
    mapping(address => Party) public registeredParties;
    address[] public partyAddresses;

    // Registered Candidate Information and addresses will be stored
    mapping(address => Candidate) public registeredCandidates;
    address[] public candidateAddresses;

    // Storing Voter details and Gender count agains Constituency
    address[] public voterAddresses;
    mapping(address => Voter) public voters;
    mapping(string => mapping(string => uint)) public constituencyVoterCount; // constituency -> (gender -> count)

    // mapping address to independent Candidate
    mapping(address => IndependentCandidate) public independentCandidates;
    address[] public independentCandidateAddresses;

    // Save the vote to MNA/MPA to true against voter address
    mapping(address => mapping(string => bool)) public hasVoted;

    // CONSTRUCTOR //

    constructor(address _subAdmin) {
        i_admin = msg.sender;
        i_subAdmin = _subAdmin;
        roles[msg.sender] = Role.admin;
    }

    // MODIFIERS //

    modifier onlyAdmin() {
        require(msg.sender == i_admin, "Only admin can perform this action");
        _;
    }

    modifier onlyAdminAndSubAdmin() {
        require(
            msg.sender == i_admin || msg.sender == i_subAdmin,
            "Only admin and Sub Admin can perform this action"
        );
        _;
    }

    modifier onlyRegisteredParty() {
        require(
            registeredParties[msg.sender].electionYear == electionYearByAdmin,
            "Only registered party can perform this action"
        );
        _;
    }

    modifier voterNotRegistered() {
        require(
            voters[msg.sender].electionYear != electionYearByAdmin,
            "Voter already registered"
        );
        _;
    }

    modifier independentCandidateNotRegistered() {
        require(
            independentCandidates[msg.sender].electionYear !=
                electionYearByAdmin,
            "Independent Candidate already registered"
        );
        _;
    }

    // EVENTS //

    // event (notification) to confirm party has been registered
    event PartyRegistered(
        string name,
        string leaderName,
        address leaderAddress,
        string leaderCnic,
        string flagSignName,
        string flagSignImage,
        string leaderFingerprint,
        string leaderProfilePic
    );

    // event (notification) to confirm candidate has been registered
    event CandidateRegistered(
        string name,
        string seatType,
        string constituency,
        address walletAddress,
        string partyName,
        string cnic,
        string profilePic,
        string partySignImage
    );

    event VoterRegistered(
        address voterAddress,
        string firstName,
        string lastName
    );

    event IndependentCandidateRegistered(
        address independentCandidateAddress,
        string firstName,
        string lastName,
        string partyName,
        string seatType
    );
    event VoteCasted(
        address indexed voter,
        address indexed candidate,
        string seatType
    );
    // Event for off-chain tracking
    event CandidateWithdrawn(address indexed candidateAddress);

    // FUNCTIONS //
    /* <<<==================================== Get Role====================================>>> */
    function getRole(address _userAddress) public view returns (Role) {
        return roles[_userAddress];
    }

    /* <<<==================================== ELECTION TIME TABLE BY ADMIN ====================================>>> */
    function setYear(uint256 _electionYear) public onlyAdmin {
        electionYearByAdmin = _electionYear;
    }
    // Function For Setting the Year of election
    function setElectionYear(
        uint256 year,
        uint256 startDay,
        uint256 startMonth,
        uint256 startYear,
        uint256 startHour,
        uint256 endDay,
        uint256 endMonth,
        uint256 endYear,
        uint256 endHour
    ) public onlyAdmin {
        require(
            endYear > startYear ||
                (endYear == startYear &&
                    (endMonth > startMonth ||
                        (endMonth == startMonth && endDay > startDay))),
            "End time must be after start time"
        );
        electionYears[year] = TimeFrame(
            startDay,
            startMonth,
            startYear,
            startHour,
            endDay,
            endMonth,
            endYear,
            endHour
        );
    }

    // Function For Setting the Registration time for voting
    function setVoterRegistrationPeriod(
        uint256 startDay,
        uint256 startMonth,
        uint256 startYear,
        uint256 startHour,
        uint256 endDay,
        uint256 endMonth,
        uint256 endYear,
        uint256 endHour
    ) public onlyAdminAndSubAdmin {
        require(
            endYear > startYear ||
                (endYear == startYear &&
                    (endMonth > startMonth ||
                        (endMonth == startMonth && endDay > startDay))),
            "End time must be after start time"
        );
        voterRegistrationPeriods[electionYearByAdmin] = TimeFrame(
            startDay,
            startMonth,
            startYear,
            startHour,
            endDay,
            endMonth,
            endYear,
            endHour
        );
    }

    // Function For Setting the Registration time for Candidate Seat
    function setCandidateRegistrationPeriod(
        uint256 startDay,
        uint256 startMonth,
        uint256 startYear,
        uint256 startHour,
        uint256 endDay,
        uint256 endMonth,
        uint256 endYear,
        uint256 endHour
    ) public onlyAdminAndSubAdmin {
        require(
            endYear > startYear ||
                (endYear == startYear &&
                    (endMonth > startMonth ||
                        (endMonth == startMonth && endDay > startDay))),
            "End time must be after start time"
        );
        candidateRegistrationPeriods[electionYearByAdmin] = TimeFrame(
            startDay,
            startMonth,
            startYear,
            startHour,
            endDay,
            endMonth,
            endYear,
            endHour
        );
    }

    // RETURN THE CURRENT ELECTION YEAR BY ADMIN
    function getElectionYear() public view returns (uint256) {
        return electionYearByAdmin;
    }

    // RETURN THE ELECTION YEAR TIME TABLE
    function getElectionYearTimeFrame(
        uint256 year
    )
        public
        view
        returns (
            uint256 startDay,
            uint256 startMonth,
            uint256 startYear,
            uint256 startHour,
            uint256 endDay,
            uint256 endMonth,
            uint256 endYear,
            uint256 endHour
        )
    {
        TimeFrame memory tf = electionYears[year];
        return (
            tf.startDay,
            tf.startMonth,
            tf.startYear,
            tf.startHour,
            tf.endDay,
            tf.endMonth,
            tf.endYear,
            tf.endHour
        );
    }

    /* <<<==================================== PARTY AND CANDIDATE REGISTRATIONS BY ADMIN AND PARTY ====================================>>> */

    // FUNCTION FOR REGISTERING THE PARTY BY ADMIN
    function registerParty(
        string memory _name,
        string memory _leaderName,
        address _leaderAddress,
        string memory _leaderCnic,
        string memory _flagSignName,
        string memory _flagSignImage,
        string memory _leaderFingerprint,
        string memory _leaderProfilePic
    ) public onlyAdmin {
        require(
            registeredParties[_leaderAddress].electionYear !=
                electionYearByAdmin,
            "Party already registered"
        );

        registeredParties[_leaderAddress] = Party({
            name: _name,
            leaderName: _leaderName,
            leaderAddress: _leaderAddress,
            leaderCnic: _leaderCnic,
            flagSignName: _flagSignName,
            flagSignImage: _flagSignImage,
            leaderFingerprint: _leaderFingerprint,
            leaderProfilePic: _leaderProfilePic,
            electionYear: electionYearByAdmin,
            isRegistered: true,
            assignRole: Role.party
        });

        partyAddresses.push(_leaderAddress);
        roles[_leaderAddress] = Role.party;
        emit PartyRegistered(
            _name,
            _leaderName,
            _leaderAddress,
            _leaderCnic,
            _flagSignName,
            _flagSignImage,
            _leaderFingerprint,
            _leaderProfilePic
        );
    }

    // FUNCTION FOR REGISTERING THE CANDIDATE BY PARTY
    function registerCandidate(
        string memory _name,
        string memory _seatType,
        string memory _constituency,
        address _walletAddress,
        string memory _partyName,
        string memory _cnic,
        string memory _profilePic,
        string memory _partySignImage
    ) public onlyRegisteredParty {
        require(
            registeredCandidates[_walletAddress].electionYear !=
                electionYearByAdmin,
            "Candidate already registered"
        );

        registeredCandidates[_walletAddress] = Candidate({
            name: _name,
            seatType: _seatType,
            constituency: _constituency,
            walletAddress: _walletAddress,
            partyName: _partyName,
            cnic: _cnic,
            profilePic: _profilePic,
            partySignImage: _partySignImage,
            electionYear: electionYearByAdmin,
            isRegistered: true,
            voteCount: 0,
            assignRole: Role.partyCandidate
        });

        candidateAddresses.push(_walletAddress);
        roles[_walletAddress] = Role.partyCandidate;
        emit CandidateRegistered(
            _name,
            _seatType,
            _constituency,
            _walletAddress,
            _partyName,
            _cnic,
            _profilePic,
            _partySignImage
        );
    }

    function getParty(
        address _leaderAddress
    ) public view onlyAdmin returns (Party memory) {
        require(
            registeredParties[_leaderAddress].isRegistered,
            "Party not found"
        );
        return registeredParties[_leaderAddress];
    }

    function getAllParties() public view onlyAdmin returns (address[] memory) {
        require(partyAddresses.length > 0, "No parties found");
        return partyAddresses;
    }

    function getCandidate(
        address _walletAddress
    ) public view returns (Candidate memory) {
        require(
            registeredCandidates[_walletAddress].isRegistered,
            "Candidate not found"
        );
        return registeredCandidates[_walletAddress];
    }

    function getAllCandidates() public view returns (address[] memory) {
        require(candidateAddresses.length > 0, "No candidates found");
        return candidateAddresses;
    }

    /* <<<==================================== VOTER REGISTRATION FOR THE VOTING ====================================>>> */
    function registerVoter(
        string memory _firstName,
        string memory _lastName,
        string memory _cnic,
        string memory _phoneNumber,
        uint256 _birthYear,
        uint256 _birthMonth,
        uint256 _birthDay,
        string memory _constituency,
        string memory _gender,
        string memory _cnicImage,
        string memory _fingerprint
    ) public voterNotRegistered {
        voters[msg.sender] = Voter({
            firstName: _firstName,
            lastName: _lastName,
            cnic: _cnic,
            phoneNumber: _phoneNumber,
            birthYear: _birthYear,
            birthMonth: _birthMonth,
            birthDay: _birthDay,
            constituency: _constituency,
            gender: _gender,
            cnicImage: _cnicImage,
            fingerprint: _fingerprint,
            acceptedVotingTerm: true,
            electionYear: electionYearByAdmin,
            isRegistered: true
        });
        totalVoters++;
        totalVotersPerYear[electionYearByAdmin]++;
        if (
            keccak256(abi.encodePacked(voters[msg.sender].gender)) ==
            keccak256(abi.encodePacked("male"))
        ) {
            totalMaleVoters++;
            constituencyVoterCount[_constituency]["male"]++;
        } else {
            totalFemaleVoters++;
            constituencyVoterCount[_constituency]["female"]++;
        }
        voterAddresses.push(msg.sender);
        emit VoterRegistered(msg.sender, _firstName, _lastName);
    }

    function getVoter(
        address _voterAddress
    ) public view returns (Voter memory) {
        require(voters[_voterAddress].isRegistered, "Voter not found");
        return voters[_voterAddress];
    }

    function getAllVoters() public view onlyAdmin returns (Voter[] memory) {
        Voter[] memory allVoters = new Voter[](voterAddresses.length);
        for (uint256 i = 0; i < voterAddresses.length; i++) {
            allVoters[i] = voters[voterAddresses[i]];
        }
        return allVoters;
    }

    function getVoterCountByConstituency(
        string memory _constituency,
        string memory _gender
    ) public view returns (uint) {
        return constituencyVoterCount[_constituency][_gender];
    }

    /* <<<==================================== INDEPENDENT CANDIDATE REGISTRATION FOR THE VOTING ====================================>>> */
    function registerIndependentCandidate(
        string memory _firstName,
        string memory _lastName,
        string memory _cnic,
        string memory _phoneNumber,
        uint256 _birthYear,
        uint256 _birthMonth,
        uint256 _birthDay,
        string memory _constituency,
        string memory _gender,
        string memory _cnicImage,
        string memory _fingerprint,
        string memory _independentCandidateAddress,
        string memory _flagSign,
        string memory _profileImage,
        string memory _seatType // Seat type (MNA, MPA, etc.)
    ) public independentCandidateNotRegistered {
        independentCandidates[msg.sender] = IndependentCandidate({
            firstName: _firstName,
            lastName: _lastName,
            cnic: _cnic,
            phoneNumber: _phoneNumber,
            birthYear: _birthYear,
            birthMonth: _birthMonth,
            birthDay: _birthDay,
            constituency: _constituency,
            gender: _gender,
            cnicImage: _cnicImage,
            fingerprint: _fingerprint,
            partyName: "Independent",
            independentCandidateAddress: _independentCandidateAddress,
            flagSign: _flagSign,
            profileImage: _profileImage,
            acceptedVotingTerm: true,
            electionYear: electionYearByAdmin,
            isRegistered: true,
            seatType: _seatType, // Set the seat type
            voteCount: 0
        });

        emit IndependentCandidateRegistered(
            msg.sender,
            _firstName,
            _lastName,
            "Independent", // Party name fixed to "Independent"
            _seatType
        );
    }

    function getIndependentCandidate(
        address _independentCandidateAddress
    ) public view returns (IndependentCandidate memory) {
        require(
            independentCandidates[_independentCandidateAddress].isRegistered,
            "Independent Candidate not found"
        );
        return independentCandidates[_independentCandidateAddress];
    }

    /* <<<==================================== Get CANDIDATES FOR VOTING ACCORDING TO VOTER CONSTITUENCY ====================================>>> */
    function getCandidatesByConstituency()
        public
        view
        returns (Candidate[] memory, IndependentCandidate[] memory)
    {
        require(
            voters[msg.sender].isRegistered,
            "You are not a registered voter"
        );

        string memory voterConstituency = voters[msg.sender].constituency;

        // ===== Party Candidates =====
        uint256 partyCount = 0;
        for (uint256 i = 0; i < candidateAddresses.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(
                        registeredCandidates[candidateAddresses[i]].constituency
                    )
                ) == keccak256(abi.encodePacked(voterConstituency))
            ) {
                partyCount++;
            }
        }

        Candidate[] memory matchedPartyCandidates = new Candidate[](partyCount);
        uint256 partyIndex = 0;
        for (uint256 i = 0; i < candidateAddresses.length; i++) {
            Candidate memory c = registeredCandidates[candidateAddresses[i]];
            if (
                keccak256(abi.encodePacked(c.constituency)) ==
                keccak256(abi.encodePacked(voterConstituency))
            ) {
                matchedPartyCandidates[partyIndex] = c;
                partyIndex++;
            }
        }

        // ===== Independent Candidates =====
        uint256 indepCount = 0;
        for (uint256 i = 0; i < independentCandidateAddresses.length; i++) {
            if (
                independentCandidates[independentCandidateAddresses[i]]
                    .isRegistered &&
                keccak256(
                    abi.encodePacked(
                        independentCandidates[independentCandidateAddresses[i]]
                            .constituency
                    )
                ) ==
                keccak256(abi.encodePacked(voterConstituency))
            ) {
                indepCount++;
            }
        }

        IndependentCandidate[]
            memory matchedIndepCandidates = new IndependentCandidate[](
                indepCount
            );
        uint256 indepIndex = 0;
        for (uint256 i = 0; i < independentCandidateAddresses.length; i++) {
            IndependentCandidate memory ic = independentCandidates[
                independentCandidateAddresses[i]
            ];
            if (
                ic.isRegistered &&
                keccak256(abi.encodePacked(ic.constituency)) ==
                keccak256(abi.encodePacked(voterConstituency))
            ) {
                matchedIndepCandidates[indepIndex] = ic;
                indepIndex++;
            }
        }

        return (matchedPartyCandidates, matchedIndepCandidates);
    }

    /* <<<==================================== Withdraw of Registered Candidate ====================================>>> */

    function withdrawCandidateRegistration() public {
        // Check if sender is a registered party candidate
        if (registeredCandidates[msg.sender].isRegistered) {
            Candidate storage candidate = registeredCandidates[msg.sender];

            // Deregister party candidate
            candidate.name = "";
            candidate.seatType = "";
            candidate.constituency = "";
            candidate.walletAddress = address(0);
            candidate.partyName = "";
            candidate.cnic = "";
            candidate.profilePic = "";
            candidate.partySignImage = "";
            candidate.electionYear = 0;
            candidate.isRegistered = false;
            candidate.voteCount = 0;
            candidate.assignRole = Role.none;

            roles[msg.sender] = Role.none;

            removeCandidateAddress(msg.sender);
            emit CandidateWithdrawn(msg.sender);
        }
        // Check if sender is a registered independent candidate
        else if (independentCandidates[msg.sender].isRegistered) {
            IndependentCandidate storage candidate = independentCandidates[
                msg.sender
            ];

            // Deregister independent candidate
            candidate.firstName = "";
            candidate.lastName = "";
            candidate.cnic = "";
            candidate.phoneNumber = "";
            candidate.birthYear = 0;
            candidate.birthMonth = 0;
            candidate.birthDay = 0;
            candidate.constituency = "";
            candidate.gender = "";
            candidate.cnicImage = "";
            candidate.fingerprint = "";
            candidate.partyName = "";
            candidate.independentCandidateAddress = "";
            candidate.flagSign = "";
            candidate.profileImage = "";
            candidate.acceptedVotingTerm = false;
            candidate.electionYear = 0;
            candidate.isRegistered = false;
            candidate.seatType = "";
            candidate.voteCount = 0;

            roles[msg.sender] = Role.none;

            removeIndependentCandidateAddress(msg.sender);
            emit CandidateWithdrawn(msg.sender);
        } else {
            revert("You are not registered as a candidate.");
        }
    }

    function removeCandidateAddress(address candidate) internal {
        for (uint256 i = 0; i < candidateAddresses.length; i++) {
            if (candidateAddresses[i] == candidate) {
                candidateAddresses[i] = candidateAddresses[
                    candidateAddresses.length - 1
                ];
                candidateAddresses.pop();
                break;
            }
        }
    }

    function removeIndependentCandidateAddress(address candidate) internal {
        for (uint256 i = 0; i < independentCandidateAddresses.length; i++) {
            if (independentCandidateAddresses[i] == candidate) {
                independentCandidateAddresses[
                    i
                ] = independentCandidateAddresses[
                    independentCandidateAddresses.length - 1
                ];
                independentCandidateAddresses.pop();
                break;
            }
        }
    }

    /* <<<==================================== VOTE THE  CANDIDATES ACCORDING TO VOTER CONSTITUENCY ====================================>>> */
    function vote(address _candidateAddress, string memory _seatType) public {
        require(
            voters[msg.sender].isRegistered,
            "You are not a registered voter"
        );
        require(
            !hasVoted[msg.sender][_seatType],
            string(abi.encodePacked("You have already voted for ", _seatType))
        );

        string memory voterConstituency = voters[msg.sender].constituency;

        // Check if candidate is party-based
        if (registeredCandidates[_candidateAddress].isRegistered) {
            Candidate storage c = registeredCandidates[_candidateAddress];
            require(
                keccak256(abi.encodePacked(c.constituency)) ==
                    keccak256(abi.encodePacked(voterConstituency)),
                "Candidate is not from your constituency"
            );
            require(
                keccak256(abi.encodePacked(c.seatType)) ==
                    keccak256(abi.encodePacked(_seatType)),
                "Candidate does not match seat type"
            );
            c.voteCount++;
        }
        // Or independent
        else if (independentCandidates[_candidateAddress].isRegistered) {
            IndependentCandidate storage ic = independentCandidates[
                _candidateAddress
            ];
            require(
                keccak256(abi.encodePacked(ic.constituency)) ==
                    keccak256(abi.encodePacked(voterConstituency)),
                "Candidate is not from your constituency"
            );
            require(
                keccak256(abi.encodePacked(ic.seatType)) ==
                    keccak256(abi.encodePacked(_seatType)),
                "Candidate does not match seat type"
            );
            ic.voteCount++;
        } else {
            revert("Candidate not found");
        }

        hasVoted[msg.sender][_seatType] = true;
        votesCastPerYear[electionYearByAdmin]++;
        emit VoteCasted(msg.sender, _candidateAddress, _seatType);
    }

    /* <<<==================================== Get the Turnout Ratio of the Voters ====================================>>> */

    function getTurnoutRatio(
        uint256 _year
    ) public view returns (uint256 turnoutPercentage) {
        uint256 total = totalVotersPerYear[_year];
        uint256 voted = votesCastPerYear[_year];
        if (total == 0) return 0;
        return (voted * 100) / total;
    }
    function getCurrentAndPreviousTurnout()
        public
        view
        returns (uint256 currentYearTurnout, uint256 prevYearTurnout)
    {
        currentYearTurnout = getTurnoutRatio(electionYearByAdmin);
        prevYearTurnout = getTurnoutRatio(electionYearByAdmin - 1);
    }

    /* <<<==================================== Getters for Dashboards ====================================>>> */
    function getVoterCounts()
        public
        view
        returns (
            uint256 _totalVoters,
            uint256 _totalMaleVoters,
            uint256 _totalFemaleVoters
        )
    {
        return (totalVoters, totalMaleVoters, totalFemaleVoters);
    }

    /* <<<==================================== THE END ====================================>>> */
}
