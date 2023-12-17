import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Button, Flex } from 'antd';
import { ethers, verifyMessage } from 'ethers';
import { UserSignUp } from './user'
import { abi, contractAddress } from './contract/user'

function App() {
  let signer = null;
  let provider;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
};


const verifyMessages = async ( message, address, signature ) => {
  console.log("message:",message)
  try {
    const signerAddr =  await verifyMessage(message, signature);
    console.log("signerAddr is:",signerAddr)
    // console.log("signerAddr is:",signerAddr)
    if (signerAddr !== address) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }};

  const connect = async () => {


    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    // 当前访问人address
    const addr = await signer.getAddress();
    console.log("addr", addr);
    var randomStr = randomString();
    console.log("randomStr is:", randomStr);
    let signature = await signer.signMessage(randomStr);
    console.log("signature is:", signature);
    var status = await verifyMessages(randomStr, addr, signature)

    setIsLoggedIn(status)

    console.log("verify status is:", status);
  };

  const handleSetUser = async (userAddress, username, metaData) => {

    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }

    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // debugger;
      // 调用合约的 setUser 方法
      const transaction = await contract.setUser(userAddress, username, metaData);
      // debugger;

      await transaction.wait();
      console.log('Transaction successful!');
      const tractionMsg = await contract.getUser(userAddress);
      await tractionMsg.wait();
      console.log('tractionMsg is:', tractionMsg);

    } catch (error) {
      console.error('Error:', error);
    }

  }



  return (
    <Flex vertical gap="small" style={{ width: '100%', margintop:'100px' }}>
      {
        isLoggedIn ? <UserSignUp  handleSetUser={handleSetUser} />
        :
        <div>
          <Button type="primary" onClick={()=>connect()} block>
          login
          </Button>
        </div>
      }
  </Flex>
  );
}

export default App;




