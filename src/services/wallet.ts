import * as lightwallet from "eth-lightwallet";

interface Wallet {
    privateKey: string;
    seedPhrase: string;
    address: string;
};

class WalletService {
    generate(password: string): Promise<Wallet> {
        const seedPhrase = lightwallet.keystore.generateRandomSeed();
        return new Promise((resolve, reject) => {
            lightwallet.keystore.createVault({
                password,
                seedPhrase,
                hdPathString: "m/44'/60'/0'/0"
            }, function (err, ks) {
                if(err) {
                    return reject(err);
                }
        
                ks.keyFromPassword(password, function (err, pwDerivedKey) {
                    if(err) {
                        return reject(err);
                    }
        
                    ks.generateNewAddress(pwDerivedKey, 1);
                    const addresses = ks.getAddresses();
                    const privateKey = ks.exportPrivateKey(addresses[0], pwDerivedKey);

                    resolve({
                        privateKey,
                        seedPhrase,
                        address: addresses[0],
                    });
                });
            });
        })
    }
}

export default new WalletService();
