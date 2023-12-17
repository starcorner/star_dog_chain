import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import { Button, Flex,Input,Card,Space,Divider} from 'antd';
import { ethers, verifyMessage, } from 'ethers';



export const UserSignUp = ({handleSetUser}) => {

    const [inputValue, setInputValue] = useState('');
    const contractAddress = '0xb33a43eb14df8468430132066bab1409a888b981'; // 替换为你的智能合约地址
    const [userAddress, setUserAddress] = useState(''); // 用户地址
    const [username, setUsername] = useState(''); // 用户名
    const [metaData, setMetaData] = useState(''); // 元数据
    const handleUserAddressChange = (e) => {
        setUserAddress(e.target.value);
      };

      const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };

      const handleMetaDataChange = (e) => {
        setMetaData(e.target.value);
      };
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "metaData",
                    "type": "string"
                }
            ],
            "name": "setUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "name": "getUser",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]; // 替换为你的智能合约 ABI

    // const handleCommit = async () => {
    //     try {
    //       const contract = new ethers.Contract(contractAddress, abi, signer);
    //       console.log("contract is:", contract)
    //       console.log("userAddress is:", userAddress)
    //       console.log("username is:", username)
    //       console.log("metaData is:", metaData)

    //       debugger;
    //       // 调用合约的 setUser 方法
    //       const transaction = await contract.setUser(userAddress, username, metaData);

    //       debugger;

    //       await transaction.wait();
    //       console.log('Transaction successful!');
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    // };


  return (
    <Flex vertical gap="small" style={{ width: '100%', margintop:'100px' }}>

      <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card title="" size="small">
    用户名   ：
      <Input style={{ width: '50%', margintop:'100px' }}
      placeholder="please
      input your username"
      value={username}
      onChange={handleUsernameChange}
       />
       {/* <p>userName 的值是: {username}</p> 显示当前输入的值 */}
       <Divider plain></Divider>
     Address：
     <Input style={{ width: '50%', margintop:'100px' }}
      placeholder="please
      input your userAddress"
      value={userAddress}
      onChange={handleUserAddressChange}
       />
       {/* <p>userAddress 的值是: {userAddress}</p> 显示当前输入的值 */}
       <Divider plain></Divider>
       metaData：
       <Input style={{ width: '50%', margintop:'100px' }}
      placeholder="please
      input your metaData"
      value={metaData}
      onChange={handleMetaDataChange}
       />
       {/* <p>Metadata的值是: {metaData}</p> 显示当前输入的值 */}
       <Divider plain></Divider>
      <Button onClick={() => {handleSetUser(userAddress, username, metaData)}} type="primary" style={{marginleft:'50%'}}>
        commit
      </Button>
      </Card>
      </Space>

      </div>

    {/* <Button block>Default</Button> */}

  </Flex>
  );
}
