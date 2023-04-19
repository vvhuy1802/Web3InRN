import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import Web3 from 'web3';

export default function App() {
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'Total',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_newValue',
          type: 'uint256',
        },
      ],
      name: 'Incremented',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: '_id',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'address',
          name: '_wallet',
          type: 'address',
        },
      ],
      name: 'Sent_Data',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_id',
          type: 'string',
        },
      ],
      name: 'Create',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'Total',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'arrAccount',
      outputs: [
        {
          internalType: 'string',
          name: '_ID',
          type: 'string',
        },
        {
          internalType: 'address',
          name: '_Wallet',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_newValue',
          type: 'uint256',
        },
      ],
      name: 'increment',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];
  const [num, setNum] = useState('');
  const [value, setValue] = useState(0);
  const address_contract = '0xA4C174eEa292780eD7cAFC2c68ADCc0f592eC1c7';
  const web3 = new Web3(
    'https://data-seed-prebsc-1-s1.binance.org:8545/d84c5781140b48468e16993b89a90a5f',
  );
  const contract = new web3.eth.Contract(abi, address_contract);

  const send = async () => {
    const privateKey =
      '76b5691fb3c669e3157402bdf4181c36f82835770ad47fbc977641c16ec62b35';
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const tx = {
      from: account.address,
      to: address_contract,
      gas: 50000,
      data: contract.methods.increment(Number(num)).encodeABI(),
    };
    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    setNum('');
    show();
  };
  const show = async () => {
    const value = await contract.methods.Total().call();
    setValue(value);
  };
  const showArr = async () => {
    const arr = await contract.methods.arrAccount(0).call();
    console.log(arr);
  }
  useEffect(() => {
    show();
    showArr();
  }, []);
  return (
    <View>
      <View style={{padding: 50, alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 30}}>{value}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TextInput
            placeholder="0"
            style={{
              width: 200,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => setNum(text)}
            value={num}
          />
          <TouchableOpacity
            onPress={() => {
              send();
            }}>
            <Text style={{fontSize: 30, marginLeft: 20}}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
