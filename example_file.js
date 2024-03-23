Material estudo EthSamba - Chainlink Bootcamp - 2024-03-22
Iero Xavier

Professora: Solange Gueiros

https://pad.riseup.net/p/chainlink-ethsamba

https://github.com/solangegueiros/chainlink-bootcamp-2024

https://workshop-faucet.vercel.app/faucets/fuji
Senha: LinkShadowFork18

https://metamask.io/
Canto superior esquerdo
Show test networks
Sepolia

*********************************************

https://sepolia.etherscan.io/

https://remix.ethereum.org/


Icone 4 - SOLIDITY COMPILER
Habilitar Auto compile

Icone 5 - DEPLOY & RUN TRANSACTIONS

ENVIRONMENT
Injected provider - Metamask
Verifique se a rede é 
Sepolia (11155111) network

Icone 2 - FILE EXPLORER

Criar o arquivo 
Register.sol

Copiar e colar o que estiver entre o inicio e fim

// Inicio
// SPDX-License-Identifier: MIT 
pragma solidity 0.8.21; 

contract Register { 
    string private info; 
    
    function getInfo() public view returns (string memory) { 
        return info;
    } 

    function setInfo(string memory _info) public { 
        info = _info; 
    } 
} 

// Fim

Icone 4 - SOLIDITY COMPILER
Sinal verde
Compilation successful

Icone 5 - DEPLOY & RUN TRANSACTIONS
Deploy

Deployed/Unpinned Contracts

Copiar o endereco do Register


Alterar o contrato de outro

At Address
Endereco do contrato de outra pessoa


0x9cD5Ef015E829819Da265869a99bD8867a088621


https://dev.chain.link/


Token ERC20
https://ethereum.org/en/developers/docs/standards/tokens/

https://eips.ethereum.org/EIPS/eip-20

https://wizard.openzeppelin.com/

// inicio

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.6.0/access/AccessControl.sol";

contract Token is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("EthSamba Chainlink 2024 Token", "ESC24") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }    
}

// fim

Altera o nome e simbolo - linha 10

Deploy

Deployed/Unpinned Contracts

Copia Token Address

******************************************

Metamask - Importar Tokens
Na Metamask
Aba Tokens
Importar
Copiar o endereço do seu token

Gerar tokens
Gerar 100 tokens

No Remix
Vai para "Deployed Contracts"

Expandir o token

procure a função "Mint"

to: Seu endereço da metamask
amount: 10000
EXPLICAÇÃO: "100(2 casas + 00  decimais)"

Saldo
balanceOf
Seu endereço da metamask

https://data.chain.link/ 

TokenShop
Crie o Arquivo 
TokenShop.sol

Copie entre o Inicio e Fim

// Inicio

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Sepolia

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface TokenInterface {
    function mint(address account, uint256 amount) external;
}

contract TokenShop {
    
    AggregatorV3Interface internal priceFeed;
    TokenInterface public minter;
    uint256 public tokenPrice = 200; //1 token = 2.00 usd, with 2 decimal places
    address public owner;
    
    constructor(address tokenAddress) {
        minter = TokenInterface(tokenAddress);
        /**
        * Network: Sepolia
        * Aggregator: ETH/USD
        * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
        */
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        owner = msg.sender;
    }

    /**
    * Returns the latest answer
    */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }

    function tokenAmount(uint256 amountETH) public view returns (uint256) {
        //Sent amountETH, how many usd I have
        uint256 ethUsd = uint256(getChainlinkDataFeedLatestAnswer());       //with 8 decimal places
        uint256 amountUSD = amountETH * ethUsd / 10**18; //ETH = 18 decimal places
        uint256 amountToken = amountUSD / tokenPrice / 10**(8/2);  //8 decimal places from ETHUSD / 2 decimal places from token 
        return amountToken;
    } 

    receive() external payable {
        uint256 amountToken = tokenAmount(msg.value);
        minter.mint(msg.sender, amountToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }    
}

// Fim


Você também pode copiar do github:
https://github.com/solangegueiros/chainlink-bootcamp-2024/blob/main/TokenShop.sol 

Copie no Remix


Deploy
No Contrato
Selecione TokenShop
(Verifique se o nome do arquivo está correto: TokenShop)

Parametro:  Endereço do seu token
Clique em Deploy

**********************

ETH/USD 
333094264307
3330.94264307 
333094264307

https://eth-converter.com/
Amount 0.01 ETH = 10000000000000000

tokenAmount
10000000000000000

1665 = 16.65 tokens


No Token (contrato anterior)
De as permissões para o seu  TokenShop chamar o método mint do seu token


Clicando em no seu contrato Token MINTER_ROLE vai retornar esse resultado
0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6
Hash da palavra “MINTER_ROLE”


chame o método: "grantRole"

role
0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6

account
O Endereço do seu Token

Estou autorizando TokenShop a emitir tokens


chame o método "hasRole" para verificar se o seu contrato está com permissão
role
0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6

account
O endereço do seu TokenShop

TRUE


No Metamask
Enviar 0.01 ETH para o endereco do TokenShop


0x42ae1D5C95e927c77b85906C763579FC8667DFbF
0xB116032Da4deE0EF62EB0dC4aB246202C62D52C0 - token 
0x592d23aE8748114A215a10eE1737Ca3766CFeF30 - tokenShop

// Rifa

// Inicio

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Raffle is VRFConsumerBaseV2, ConfirmedOwner {

    //VRF
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus) public s_requests; /* requestId --> requestStatus */  

    // Sepolia coordinator
    VRFCoordinatorV2Interface COORDINATOR;
    address vrfCoordinator = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;
    bytes32 keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
   
    uint32 callbackGasLimit = 2500000;
    uint16 requestConfirmations = 3;
    uint32 numWords =  2;

    // past requests Ids.
    uint256[] public requestIds;
    uint256 public lastRequestId;
    uint256[] public lastRandomWords;

    // Your subscription ID.
    uint64 public s_subscriptionId;

    uint256[] public raffleResult;
    uint256 public maximum = 100;

    constructor(uint64 subscriptionId, uint _maximum)
        VRFConsumerBaseV2(vrfCoordinator)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        maximum = _maximum;
    }

    function listNumbers() public view returns (uint256[] memory) {
        return raffleResult;
    }

    function run() public returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;      
    }
 
    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        lastRandomWords = _randomWords;

        uint aux;
        for (uint i = 0; i < numWords; i++) {
            aux = _randomWords[i] % maximum + 1;
            raffleResult.push(aux);
        }
    }

}

// Fim

Publicado
0x900a687362F5EdD41F0cE3Bc9A5b318Cb892C6d7

VRF da Sol 
https://vrf.chain.link/sepolia/5808


*********************************************************

Blockchain Origem
Avalanche Fuji

Blockchain Sepolia
Ethereum Sepolia

Adicionar Fuji to Metamask
https://chainlist.org/chain/43113


Add LINK on Fuji on Metamask
https://docs.chain.link/resources/link-token-contracts#fuji-testnet


Faucet Fuji Adicionar AVAX na sua carteira utilize o link abaixo:

https://workshop-faucet.vercel.app/faucets/fuji
LinkShadowFork18

Endereco da sua carteira
Send Request

USDC
Add to Metamask
Como importar o Token USDC para sua metamask
https://developers.circle.com/stablecoins/docs/usdc-on-test-networks

USDC address - Avalanche Fuji testnet
0x5425890298aed601595a70ab815c96711a31bc65
https://testnet.snowtrace.io/token/0x5425890298aed601595a70ab815c96711a31bc65


Faucet
https://faucet.circle.com/
USDC from Avalanche Fuji testnet

Adicionar o Token USDC na metamask:
    0x5425890298aed601595a70ab815c96711a31bc65

Precisa de USDC na Fuji?
Enviando 0.5 USDC
Nome - Endereco da Carteira
Iero Xavier - 0x1fb26144d283A60BA8Ddebb8d12cCcbeA2B708fc

Remix
https://remix.ethereum.org/

Icon 5 - DEPLOY & RUN TRANSACTIONS
ENVIRONMENT
Injected provider - Metamask
Custom (43113) network = Fuji


Icon 2 - FILE EXPLORER
Criar
TransferUSDCBasic.sol

// inicio

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Fuji

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/utils/SafeERC20.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract TransferUSDCBasic {
    using SafeERC20 for IERC20;

    error NotEnoughBalanceForFees(uint256 currentBalance, uint256 calculatedFees);
    error NotEnoughBalanceUsdcForTransfer(uint256 currentBalance);
    error NothingToWithdraw();

    address public owner;
    IRouterClient private immutable ccipRouter;
    IERC20 private immutable linkToken;
    IERC20 private immutable usdcToken;

    // https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet#avalanche-fuji
    address ccipRouterAddress = 0xF694E193200268f9a4868e4Aa017A0118C9a8177;

    // https://docs.chain.link/resources/link-token-contracts#fuji-testnet
    address linkAddress = 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846;

    // https://developers.circle.com/stablecoins/docs/usdc-on-test-networks
    address usdcAddress = 0x5425890298aed601595a70AB815c96711a31Bc65;

    // https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet#ethereum-sepolia
    uint64 destinationChainSelector = 16015286601757825753;

    event UsdcTransferred(
        bytes32 messageId,
        uint64 destinationChainSelector,
        address receiver,
        uint256 amount,
        uint256 ccipFee
    );

    constructor() {
        owner = msg.sender;
        ccipRouter = IRouterClient(ccipRouterAddress);
        linkToken = IERC20(linkAddress);
        usdcToken = IERC20(usdcAddress);
    }

    function transferUsdcToSepolia(
        address _receiver,
        uint256 _amount
    )
        external
        returns (bytes32 messageId)
    {
        Client.EVMTokenAmount[]
            memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({
            token: address(usdcToken),
            amount: _amount
        });
        tokenAmounts[0] = tokenAmount;

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: "",
            tokenAmounts: tokenAmounts,
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 0})
            ),
            feeToken: address(linkToken)
        });

        uint256 ccipFee = ccipRouter.getFee(
            destinationChainSelector,
            message
        );

        if (ccipFee > linkToken.balanceOf(address(this)))
            revert NotEnoughBalanceForFees(linkToken.balanceOf(address(this)), ccipFee);
        linkToken.approve(address(ccipRouter), ccipFee);

        if (_amount > usdcToken.balanceOf(msg.sender))
            revert NotEnoughBalanceUsdcForTransfer(usdcToken.balanceOf(msg.sender));
        usdcToken.safeTransferFrom(msg.sender, address(this), _amount);
        usdcToken.approve(address(ccipRouter), _amount);

        // Send CCIP Message
        messageId = ccipRouter.ccipSend(destinationChainSelector, message);

        emit UsdcTransferred(
            messageId,
            destinationChainSelector,
            _receiver,
            _amount,
            ccipFee
        );
    }

    function allowanceUsdc() public view returns (uint256 usdcAmount) {
        usdcAmount = usdcToken.allowance(msg.sender, address(this));
    }

    function balancesOf(address account) public view returns (uint256 linkBalance, uint256 usdcBalance) {
        linkBalance =  linkToken.balanceOf(account);
        usdcBalance = IERC20(usdcToken).balanceOf(account);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function withdrawToken(
        address _beneficiary,
        address _token
    ) public onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();
        IERC20(_token).transfer(_beneficiary, amount);
    }
}

// fim

Deploy

Iero Xavier - 0xBBD51D95CF067eECb620873b334110Ff77d6B4f1

*************************************


Enviar LINK
No Metamask
Enviar 3 LINK para TransferUSDCBasic Address

Tokens -> LINK -> Send

LINK
3000000000000000000


BalancesOf
No Remix
Endereco do seu smart contract

Result
•	0:uint256: linkBalance 3000000000000000000
•	1:uint256: usdcBalance 0


Approve USDC
usdcAmount: 0.1 USDC
6 casas decimais
100000

Va em para aprovar o gasto de USDT do seu contrato para seu Token
https://testnet.snowtrace.io/token/0x5425890298aed601595a70ab815c96711a31bc65/contract/writeProxyContract


Connect Wallet - Sign In - canto superior direito

Approve
Expandir 
spender (address)
Endereco do seu smart contract Transfer

Amount
100000

Clicar em "Write"
Aprova no Metamask


No Remix
allowanceUsdc

Resultado
•	0:uint256: usdcAmount 100000

No Metamask
Envia Mais 1 LINK para o seu smart contract


Transfer USDC
TransferUSDCtoSepolia
_receiver
Sua carteira (from Metamask)

_amount
100000
= 0.1 USDC


Nome - Id Transacao
Iero Xavier - 0x15408e427b4475c0ec823fb6c7b255246d6b90ac576ab804dfb6ee5cc956ecd5
****************************

https://ccip.chain.link/

Veja sua transacao

no Metamask
Canto superior esquerdo
Ethereum Sepolia

Adicionar USDC
Tokens -> Import token
0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
https://sepolia.etherscan.io/address/0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238 



NFTs e Chainlink CCIP para dApps cross-chain


Metamask
Sepolia

CrossChainPriceNFT
Icon 2 - FILE EXPLORER
Create file
CrossChainPriceNFT.sol


// inicio

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Sepolia

// Importing OpenZeppelin contracts
import "@openzeppelin/contracts@4.6.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.6.0/utils/Counters.sol";
import "@openzeppelin/contracts@4.6.0/utils/Base64.sol";

// Importing Chainlink contracts
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract CrossChainPriceNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter public tokenIdCounter;

    // Create price feed
    AggregatorV3Interface internal priceFeed;
    uint256 public lastPrice = 0;

    string priceIndicatorUp = unicode"😀";
    string priceIndicatorDown = unicode"😔";
    string priceIndicatorFlat = unicode"😑";
    string public priceIndicator;

    struct ChainStruct {
        uint64 code;
        string name;
        string color;
    }
    mapping (uint256 => ChainStruct) chain;

    //https://docs.chain.link/ccip/supported-networks/testnet
    constructor() ERC721("CrossChain Price", "CCPrice") {
        chain[0] = ChainStruct ({
            code: 16015286601757825753,
            name: "Sepolia",
            color: "#0000ff" //blue
        });
        chain[1] = ChainStruct ({
            code: 14767482510784806043,
            name: "Fuji",
            color: "#ff0000" //red
        });
        chain[2] = ChainStruct ({
            code: 12532609583862916517,
            name: "Mumbai",
            color: "#4b006e" //purple
        });

        // https://docs.chain.link/data-feeds/price-feeds/addresses        
        priceFeed = AggregatorV3Interface(
            // Sepolia BTC/USD
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43            
        );

        // Mint an NFT
        mint(msg.sender);
    }

    function mint(address to) public {
        // Mint from Sepolia network = chain[0]
        mintFrom(to, 0);
    }

    function mintFrom(address to, uint256 sourceId) public {
        // sourceId 0 Sepolia, 1 Fuji, 2 Mumbai
        uint256 tokenId = tokenIdCounter.current();
        _safeMint(to, tokenId);
        updateMetaData(tokenId, sourceId);    
        tokenIdCounter.increment();
    }

    // Update MetaData
    function updateMetaData(uint256 tokenId, uint256 sourceId) public {
        // Create the SVG string
        string memory finalSVG = buildSVG(sourceId);
           
        // Base64 encode the SVG
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Cross-chain Price SVG",',
                        '"description": "SVG NFTs in different chains",',
                        '"image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSVG)), '",',
                        '"attributes": [',
                            '{"trait_type": "source",',
                            '"value": "', chain[sourceId].name ,'"},',
                            '{"trait_type": "price",',
                            '"value": "', lastPrice.toString() ,'"}',
                        ']}'
                    )
                )
            )
        );
        // Create token URI
        string memory finalTokenURI = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        // Set token URI
        _setTokenURI(tokenId, finalTokenURI);
    }

    // Build the SVG string
    function buildSVG(uint256 sourceId) internal returns (string memory) {

        // Create SVG rectangle with random color
        string memory headSVG = string(
            abi.encodePacked(
                "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='500' height='500' preserveAspectRatio='none' viewBox='0 0 500 500'> <rect width='100%' height='100%' fill='",
                chain[sourceId].color,
                "' />"
            )
        );
        // Update emoji based on price
        string memory bodySVG = string(
            abi.encodePacked(
                "<text x='50%' y='50%' font-size='128' dominant-baseline='middle' text-anchor='middle'>",
                comparePrice(),
                "</text>"
            )
        );
        // Close SVG
        string memory tailSVG = "</svg>";

        // Concatenate SVG strings
        string memory _finalSVG = string(
            abi.encodePacked(headSVG, bodySVG, tailSVG)
        );
        return _finalSVG;
    }

    // Compare new price to previous price
    function comparePrice() public returns (string memory) {
        uint256 currentPrice = getChainlinkDataFeedLatestAnswer();
        if (currentPrice > lastPrice) {
            priceIndicator = priceIndicatorUp;
        } else if (currentPrice < lastPrice) {
            priceIndicator = priceIndicatorDown;
        } else {
            priceIndicator = priceIndicatorFlat;
        }
        lastPrice = currentPrice;
        return priceIndicator;
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (uint256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // The following function is an override required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}

// fim

Deploy

Nome - endereco do NFT
Iero Xavier - 0x7326275fA02c89b754CAcbf659c2f7f3d20ae5A1

***************************

Collection - OpenSea
https://testnets.opensea.io/

Nome - Link da colecao
Iero Xavier - https://testnets.opensea.io/collection/crosschain-price-646

*******************************************

CrossDestinationMinter

Icon 2 - FILE EXPLORER
Criar file
CrossDestinationMinter.sol

//inicio

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Sepolia

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

interface InftMinter {
    function mintFrom(address account, uint256 sourceId) external;
}

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract CrossDestinationMinter is CCIPReceiver {
    InftMinter public nft;

    event MintCallSuccessfull();
    // https://docs.chain.link/ccip/supported-networks/testnet
    address routerSepolia = 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59;

    constructor(address nftAddress) CCIPReceiver(routerSepolia) {
        nft = InftMinter(nftAddress);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(nft).call(message.data);
        require(success);
        emit MintCallSuccessfull();
    }

    function testMint() external {
        // Mint from Sepolia
        nft.mintFrom(msg.sender, 0);
    }

    function testMessage() external {
        // Mint from Sepolia
        bytes memory message;
        message = abi.encodeWithSignature("mintFrom(address,uint256)", msg.sender, 0);

        (bool success, ) = address(nft).call(message);
        require(success);
        emit MintCallSuccessfull();
    }

    function updateNFT(address nftAddress) external {
        nft = InftMinter(nftAddress);
    }
}

//fim


Deploy - Na Sepolia
Parametro - endereco da sua colecao NFT

Nome - CrossDestinationMinter
Iero Xavier - 0x698D95299e3220780C3cD7C73fDff4Bcb75C9b09

**************************

Metamask - Va para Avalanche Fuji Testnet

No Remix
Icon 2 - FILE EXPLORER
Criar file
CrossSourceMinter.sol

// INICIO


// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy this contract on Fuji

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract CrossSourceMinter {

    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance to cover the fees.
    error NothingToWithdraw(); // Used when trying to withdraw but there's nothing to withdraw.

    IRouterClient public router;
    LinkTokenInterface public linkToken;
    uint64 public destinationChainSelector;
    address public owner;
    address public destinationMinter;

    event MessageSent(bytes32 messageId);

    constructor(address destMinterAddress) {
        owner = msg.sender;

        // https://docs.chain.link/ccip/supported-networks/testnet

        // from Fuji
        address routerAddressFuji = 0xF694E193200268f9a4868e4Aa017A0118C9a8177;
        router = IRouterClient(routerAddressFuji);
        linkToken = LinkTokenInterface(0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846);
        linkToken.approve(routerAddressFuji, type(uint256).max);

        // to Sepolia
        destinationChainSelector = 16015286601757825753;
        destinationMinter = destMinterAddress;
    }

    function mintOnSepolia() external {
        // Mint from Fuji network = chain[1]
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(destinationMinter),
            data: abi.encodeWithSignature("mintFrom(address,uint256)", msg.sender, 1),
            tokenAmounts: new Client.EVMTokenAmount[](0), // não envia tokens
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 980_000}) // aumenta o limite de gas
            ),
            feeToken: address(linkToken) // fees
        });        

        // Get the fee required to send the message
        uint256 fees = router.getFee(destinationChainSelector, message);

        if (fees > linkToken.balanceOf(address(this))) // vê se tem saldo suficiente
            revert NotEnoughBalance(linkToken.balanceOf(address(this)), fees);

        bytes32 messageId;
        // Send the message through the router and store the returned message ID
        messageId = router.ccipSend(destinationChainSelector, message); // manda a mensagem a partir do mint para outra blockchain
        emit MessageSent(messageId);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function linkBalance (address account) public view returns (uint256) {
        return linkToken.balanceOf(account);
    }

    function withdrawLINK(
        address beneficiary
    ) public onlyOwner {
        uint256 amount = linkToken.balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();
        linkToken.transfer(beneficiary, amount);
    }
}

//fim

Deploy
Parametro - endereco DestinationMinter (contrato anterior que esta na Sepolia)

Nome - CrossSourceMinter
Iero Xavier - 0xb2F37836b9e123d4bBEd4F9fbcBB2dC5a323f34a
*****************************************************

Send LINK
No Metamask
Na rede Fuji

Envia 5 LINK para CrossSourceMinter address


No Remix, CrossSourceMinter
linkBalance
Parameter: 
CrossSourceMinter address


mintOnSepolia

Nome - Transaction ID
Iero Xavier - 0xb3329fa14596957696dcfa0828a0ff72e67eca5776ec37fc873be4f14ccdc068

****************************

https://ccip.chain.link/

****************************

https://usechainlinkfunctions.com/

https://functions.chain.link/playground



API
https://wttr.in/City?format=3&m 

https://wttr.in/Sao-Paulo?format=3&m  
https://wttr.in/Rio-De-Janeiro?format=3&m  


https://functions.chain.link/playground/13f3c115-e8b2-4eca-9c59-275f03e3b310 
Sao-Paulo
Rio-De-Janeiro

Icon 2 - FILE EXPLORER
Criar
WeatherFunctions.sol

// inicio

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Deploy on Fuji

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract WeatherFunctions is FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    // State variables to store the last request ID, response, and error
    bytes32 public lastRequestId;
    bytes public lastResponse;
    bytes public lastError;

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        bytes response;
        bytes err;
    }
    mapping(bytes32 => RequestStatus) public requests; /* requestId --> requestStatus */          
    bytes32[] public requestIds;

    // Event to log responses
    event Response(
        bytes32 indexed requestId,
        string temperature,
        bytes response,
        bytes err
    );

    // Hardcoded for Fuji
    // Supported networks https://docs.chain.link/chainlink-functions/supported-networks
    address router = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
    bytes32 donID =
        0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;

    //Callback gas limit
    uint32 gasLimit = 300000;

    // Your subscription ID.
    uint64 public subscriptionId;

    // JavaScript source code
    string public source =
        "const city = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://wttr.in/${city}?format=3&m`,"
        "responseType: 'text'"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "return Functions.encodeString(data);";
    string public lastCity;    
    string public lastTemperature;
    address public lastSender;

    struct CityStruct {
        address sender;
        uint timestamp;
        string name;
        string temperature;
    }
    CityStruct[] public cities;
    mapping(string => uint256) public cityIndex;
    mapping(bytes32 => string) public request_city; /* requestId --> city*/

    constructor(uint64 functionsSubscriptionId) FunctionsClient(router) {
        subscriptionId = functionsSubscriptionId;      
    }

    function getTemperature(
        string memory _city
    ) external returns (bytes32 requestId) {

        string[] memory args = new string[](1);
        args[0] = _city;

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        lastCity = _city;
        request_city[lastRequestId] = _city;

        CityStruct memory auxCityStruct = CityStruct({
            sender: msg.sender,
            timestamp: 0,
            name: _city,
            temperature: ""            
        });
        cities.push(auxCityStruct);
        cityIndex[_city] = cities.length-1;

        requests[lastRequestId] = RequestStatus({
            exists: true,
            fulfilled: false,
            response: "",
            err: ""
        });
        requestIds.push(lastRequestId);

        return lastRequestId;
    }

    // Receive the weather in the city requested
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        require(requests[requestId].exists, "request not found");

        lastError = err;
        lastResponse = response;

        requests[requestId].fulfilled = true;
        requests[requestId].response = response;
        requests[requestId].err = err;

        string memory auxCity = request_city[requestId];
        lastTemperature = string(response);
        cities[cityIndex[auxCity]].temperature = lastTemperature;
        cities[cityIndex[auxCity]].timestamp = block.timestamp;

        // Emit an event to log the response
        emit Response(requestId, lastTemperature, lastResponse, lastError);
    }

    function getCity(string memory city) public view returns (CityStruct memory) {
        return cities[cityIndex[city]];
    }

    function listAllCities() public view returns (CityStruct[] memory) {
        return cities;
    }

    function listCities(uint start, uint end) public view returns (CityStruct[] memory) {
        if (end > cities.length)
            end = cities.length-1;
        require (start <= end, "start must <= end");
        uint cityCount = end - start + 1;
        CityStruct[] memory citiesAux = new CityStruct[](cityCount);

        for (uint i = start; i < (end + 1); i++) {
            citiesAux[i-start] = cities[i];
        }
        return citiesAux;
    }

}

// fim

Metamask - Avalanche Fuji

https://functions.chain.link/

Connect wallet

I accept the Chainlink Foundation Terms of Service

Create Subscription

Seu email 

Subscription name
EthSamba Chainlink 2024

Add funds (LINK)
5 LINK
https://workshop-faucet.vercel.app/faucets/fuji

Actions - botao azul
Add funds

Add a consumer
I'll do it later

Name - subscription Id
Iero Xavier - https://functions.chain.link/fuji/5220

*********************************

No Remix

Deploy
Parametro - SubscriptionId

Nome - WeatherFunctions
Iero Xavier - 0x6d578402322df58f9b7896fda1ae39B134f65e0f

********************************

https://functions.chain.link/

Add Consumer
Endereco do seu contrato


No Remix
getTemperature

Sua cidade


listAllCities

Colocar a sua cidade no contrato da Sol


At Address - Endereco
0x50829A859926643Ea7538147cEc27C911f3a7904



Rifa na Fuji - Contrato
0x3d899824866d11F17F3e976cd5724deea01797C4

https://github.com/solangegueiros/chainlink-bootcamp-2024/blob/main/RaffleMumbai.sol
https://vrf.chain.link/fuji/1093

