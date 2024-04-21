-include .env
# fork from specific block number to prevent schema from attempting to register twice error

deploy-resolver:; forge script DeployResolver --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --verify --etherscan-api-key ${VERIFIER_API_KEY} --broadcast
deploy-counter:; forge script DeployCounter --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --verify --etherscan-api-key ${VERIFIER_API_KEY} --broadcast
tests-resolver:; forge test --match-contract JobResolverTest --fork-url ${RPC_URL} -vvv --fork-block-number 5724392