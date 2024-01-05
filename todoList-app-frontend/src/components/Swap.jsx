/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Swap(props){

    const [arrayOfOrders,setArrayOfOrders] = useState([]);
    const [first,setFirst] = useState(1);
    const [second,setSecond] = useState(1);
   
    useEffect(()=>{
        const generatedArray = [];
        for (let i = 1; i <= props.numberOfOrders; i++) {
            generatedArray.push({ value: i, label: i });
          }
          setArrayOfOrders(generatedArray);
    },[props.numberOfOrders])

    function onSwapTheOrder(event){
        event.preventDefault();
        props.ordersToSwap(first,second)
    }
    return(
        <>
        <form onSubmit={onSwapTheOrder}>
            <p>
            <label>Exchange these two </label>
                    <>
                         <select id="firstDropdown"  onChange={(e) => setFirst( e.target.value)}>
                            {arrayOfOrders.map((order) => (
                                <option key={order.value} value={order.value}>
                                    {order.label}
                                </option>
                            ))}
                        </select>
                        <select id="secondDropdown"  onChange={(e) => setSecond( e.target.value)}>
                            {arrayOfOrders.map((order) => (
                                <option key={order.value} value={order.value}>
                                    {order.label}
                                </option>
                            ))}
                        </select>
                    </>
          </p>
            <button>Exchange</button>
            </form>
        </>
    )

}
export default Swap;