# Storage-DAPP

Backend Create File

```sh
git clone https://github.com/Code-Parth/Storage-DAPP.git
cd storage-dapp
clear
read -p "Repository is cloned, Press enter to continue."

brownie networks add Ethereum istanbul host=http://127.0.0.1:7545 chainid=5777
read -p "Connected to Ganache Ethereum network. Press enter to continue"

brownie networks add Polygon polygon-mumbai host=https://polygon-mumbai.g.alchemy.com/v2/iQTyxaFgTvGOx2KOUiXYHW8SaR5ezWK7 chainid=80001 name="Mumbai Testnet (Alchemy)"
read -p "Added polygon mumbai API Host, Press enter to continue"

brownie run scripts/reset.py
read -p "Network has been reset, Press enter to continue"

brownie run scripts/deploy.py --network=polygon-mumbai
read -p "Network has been deployed at polygon mumbai, Press enter to continue"

brownie run scripts/update_front_end.py
read -p "Frontend updated on network, Press enter to continue"

brownie test
read -p "checked if the network is proper or not, Press enter to continue"

cd front-end
sudo yarn
read -p "Downloaded necesarry files, Press enter to start localhost"
sudo yarn start
```
