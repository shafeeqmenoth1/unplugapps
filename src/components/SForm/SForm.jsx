import React, { useEffect, useRef, useState } from 'react'
import styles from "./sform.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { getItems } from '../../redux/saleSlice';

 const SForm = ({info,setInfo,total,handleChange,addItems}) => {
  const products = useSelector(state=>state.sale.items)
  const [focusIndex, setFocusIndex] = useState(-1)
  const dispatch = useDispatch()
  const searchContainer = useRef(null)


  useEffect(() => {
    dispatch(getItems())
  }, [dispatch,products])

  useEffect(()=>{
    if(!searchContainer.current) return
    searchContainer.current.scrollIntoView({
      block:'center'
    })
  },[focusIndex,products])

  const handleKeydown = (e)=>{
    const {key} = e
  let nextIndexCount = 0
    if(key === "ArrowDown"){
      nextIndexCount = (focusIndex+1)% products.length
    }
    if(key === "ArrowUp"){
      nextIndexCount = (focusIndex + products.length -1)% products.length
    }
   
    if(key === "Enter"){
      const selectedProducts = products[focusIndex];
      if (selectedProducts) {
        onSearch(selectedProducts);
      }
    }
    setFocusIndex(nextIndexCount)
  }

  const onSearch=(searchterm)=>{
    if(searchterm)
    setInfo({
     
      item_code: searchterm.item_code,
      item_name: searchterm.item_name,
      qty: info.qty,
      description:info.description,
      rate: info.rate
    })
   
  }

  return (
    <div>
        <form autoComplete="off">
          
           <div className={styles.formBottom}>
           <div className={`${styles.formInput} ${styles.products}`} >
                <label>Item Name</label>
                <input type="text"   name="item_name" value={info?.item_name} placeholder="Item" 
                onChange={handleChange}  onKeyDown={handleKeydown}/>
                <div className={styles.dropdown}>
                  {products?.filter(item=>{
                    const searchterm =  info.item_name
                    const productname = item.item_name.toLowerCase()
                    return searchterm && productname.includes(searchterm) && productname !== searchterm
                  })
                  .map((item,index)=>(
                    <div key={item.item_code} onClick={()=>onSearch(item)} className={styles.dropdownRow}
                    ref={index=== focusIndex ? searchContainer : null} 
                    style={{backgroundColor:index===focusIndex ? 'rgba(0,0,0,0.1)' :''}}
                    >
                      {item.item_name ? item.item_name : 'No Items'}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.formInput} >
                <label>Qty</label>
                <input type='number' min="0" name="qty" value={info?.qty} placeholder="Quantity" onChange={handleChange}/>
              </div>
              <div className={styles.formInput} >
                <label>Rate</label>
                <input type="number" name="rate" value={info?.rate} placeholder="Price" onChange={handleChange}/>
              </div>
              <div className={styles.formInput} >
                <label>Description</label>
                <input type="text" name="description" value={info?.description} placeholder="Description" onChange={handleChange}/>
              </div>
              <div className={styles.formInput} >
                <label>Total</label>
                <input type="number"  name="total" value={total} placeholder="Total amount" readOnly
                />
              </div>
              <div className={styles.formInput} >
              <button onClick={addItems}>Insert</button>
              </div>
             
              </div>
          </form>
    </div>
  )
}
export default SForm