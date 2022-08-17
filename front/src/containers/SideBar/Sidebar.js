import { addMinutes, format, isPast } from "date-fns";
import { useQuery } from "react-query";
import { useRecoilState, useResetRecoilState } from "recoil";

import { getOrders } from "../../api/order";

import React, { useRef, useEffect, useState } from "react";
import sidebar from "./sidebar.module.css"
import styled from "styled-components";
import axios from 'axios';

import authState from "../../state/authState";
import locationState from "../../state/locationState";
import orderState from "../../state/orderState";

function formatDate(date) {
  return format(date, "HH:mm");
}


const SideBar = () => {
  // 사이드바 나타내기 및 숨기기
  const [arrow, setArrow] = useState({
    active: true
  });

  const isActive = (e) => {
      setArrow({
          active: !arrow.active
      })
  }
  
  // 
  async function getOrders() {
    const orders = await axios
      .get('http://127.0.0.1:8000/orders/')
      .then((response) => response.data);
      setResult(orders);
    }
  
  // 주문 state
  const [Result, setResult] = useState(null);

  // 주문 effect
  useEffect(()=> {
    getOrders()
  }, [])


  return (
    <div className={sidebar.wrapper}> 
      <input type="button" className={arrow.active ? sidebar.arrow : `${sidebar.arrow} ${sidebar.arrowActive}`} onClick={isActive} />
      <div className={arrow.active ? sidebar.sidebar : `${sidebar.sidebar} ${sidebar.sidebarActive}`}>
        
        <div className={sidebar.title}>Order List</div>
        <div className={sidebar.content}>
          
            {Result && Result.map(i=>{return(
              <div className={sidebar.myorder}>
                <div>
                  {i.brand}<br></br>
                  {i.time}<br></br><br></br>
                </div>
              </div>)})}
          
        <div className={sidebar.otherorder}></div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;