import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Popup from '../UI/popup/Popup';
import FormInput from '../UI/FormInput';
import SubmitButton from '../UI/SubmitButton';
import Profile from './profile/Profile';

const Background = styled.div`
  position: relative;
  background: #fff;
  border-bottom: 1px #545454 solid;
`

const Head = styled.header`
  width: 100%;
  max-width: 1170px;
  height: 83px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  width: 80px;
  height: 37px;
  border-radius: 10px;
  background-color: #212121;
  color: #fff;
  cursor: pointer;
`

const ShowProfile = styled.button`
  position: absolute;
  top: 22px;
  right: 40px;
  z-index: 1000;
`

const Logo = styled.h1``

export const RoleContext = React.createContext();
export const NameContext = React.createContext();

const Header = () => {
  const [login, setLogin] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState('user');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginPopupActive, setLoginPopupActive] = useState(false);
  const [registrationPopupActive, setRegistrationPopupActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);

  function loginForm(event) {
    const formData = new FormData(event.target);

    event.preventDefault();
    fetch("http://127.0.0.1:8000/auth/token/login/", {
      method : 'POST',
      body : formData
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      if (response.auth_token) {
        console.log("Token " + response.auth_token)
        getUser("Token " + response.auth_token);
      }
    })
  }

  function getUser(token) {
    fetch("http://127.0.0.1:8000/api/v1/auth/users/me", {
      method : 'GET',
      headers : {"Authorization": token}
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      console.log(response);
    })
  }

  function registrationForm(event) {
    const formData = new FormData(event.target);

    event.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/auth/users/", {
      method : 'POST',
      body : formData
    })
    .then (response => response.text())
    .then (response => {
      response = JSON.parse(response);
      console.log(response);
    })
  }

  function closeLogin() {
    setError('');
    setLoginPopupActive(false);
    setRegistrationPopupActive(true);
  }

  function closeRegistration() {
    setError('');
    setLoginPopupActive(true);
    setRegistrationPopupActive(false);
  }

  return (
    <Background>
      <Head>
        <a href='/'>Taro</a>
        {isLogin 
          ?
          <ul>
            <li>
              <Button onClick={() => setProfileActive(true)}>в профиль</Button>
            </li>
          </ul>
          :
          <ul>
            <Button onClick={() => setLoginPopupActive(true)}>войти</Button>
          </ul>
        }
      </Head>
      <Popup active={loginPopupActive} setActive={setLoginPopupActive}>
        <form name="form-reg" className="loginRight" onSubmit={loginForm}>
          <FormInput placeholder="email" name="email" value={login} onChange={event => setLogin(event.target.value)}/>
          <FormInput placeholder="Password" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
          <SubmitButton>Войти</SubmitButton>
          {error}
          <button type="button" onClick={closeLogin} href="/registration">
            Create a New Account
          </button>
        </form>
      </Popup>
      <Popup active={registrationPopupActive} setActive={setRegistrationPopupActive}>
        <form name="form-reg" className="loginRight" onSubmit={registrationForm}>
          <FormInput placeholder="email" name="email" type="email" value={login} onChange={event => setLogin(event.target.value)}/>
          <FormInput placeholder="Password" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
          <SubmitButton>Зарегистрироваться</SubmitButton>
          {error}
          <button type="button" onClick={closeRegistration} href="/registration">
            Login
          </button>
        </form>
      </Popup>
      <RoleContext.Provider value={role}>
        <NameContext.Provider value={userName}>
          <Profile active={profileActive} setActive={setProfileActive} logout={() => setIsLogin(false)}/>
        </NameContext.Provider>
      </RoleContext.Provider>
    </Background>
  )
}

export default Header;