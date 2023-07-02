import styles from "./newsales.module.scss";
import { useEffect, useRef, useState } from "react";
import SForm from "../../components/SForm/SForm";
import SItemsList from "../../components/SItemsList/SItemsList";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { createSale, getItems, resetState } from "../../redux/saleSlice";
import Invoice from "../../components/invoice/Invoice";
import ReactToPrint, { useReactToPrint } from "react-to-print";





const NewSales = () => {
  const componentRef = useRef()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const vr_date = moment()
  const [info, setInfo] = useState({
    sr_no: "",
    item_code: "",
    item_name: "",
    qty: "",
    description: "",
    rate: "",

  })
  const [customer, setCustomer] = useState({
    vr_no: "",
    ac_name: "",
    status: "A"
  })
  const [total, setTotal] = useState(0)
  const initialState = JSON.parse(localStorage.getItem("productList")) || [];
  const [editProduct, setEditProduct] = useState("")
  const [itemList, setItemList] = useState(initialState)
  const {createdSale,isSuccess} = useSelector(state=>state.sale) 
  const [clearForm, setClearForm] = useState(false);


  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(itemList))
    setTotal(info.rate && info.rate * info.qty)

  }, [itemList, info])


  useEffect(() => {
    if (editProduct)
      setInfo(editProduct)

  }, [setInfo, editProduct,customer])

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  }


  const handleHeader = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }
  useEffect(() => {
    if (clearForm) {
      setInfo({
        sr_no: "",
        item_code: "",
        item_name: "",
        qty: "",
        description: "",
        rate: ""
      });
     
      setClearForm(false);
    }
  }, [clearForm]);

  const updateItemList = (info, id, total) => {
    const newitemList = itemList.map((item) =>
      item.id === id ? { ...info, id, total } : item
    )
    setItemList(newitemList)


  }



  const addItems = (e) => {
    e.preventDefault()

    if (!editProduct) {

      if (info.qty && info.rate && info.item_name && info.description) {
        setItemList([...itemList, { ...info, total: total }]);
        setClearForm(true)
      } else {
       
        setClearForm(false)
      }

    } else {
      updateItemList(info, editProduct.id, total)
      setClearForm(true)
    }

  }

  const getGrandtotal = () => {
    let grandtotal = 0
    itemList.forEach((item) => {
      grandtotal += item.total
    })
    return grandtotal
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      if(customer.vr_no && customer.ac_name){
      let list = []
      list = itemList.map((item, index) => {
        let detailObj = {}
        detailObj.vr_no = customer.vr_no,
          detailObj.sr_no = index + 1,
          detailObj.item_code = item.item_code
        detailObj.item_name = item.item_name
        detailObj.description = item.description
        detailObj.qty = item.qty
        detailObj.rate = item.rate
        return detailObj
      })

      const newData = {
        header_table: {
          vr_no: customer.vr_no,
          vr_date: vr_date.format("DD/MM/YYYY"),
          ac_name: customer.ac_name,
          ac_amt: getGrandtotal(),
          status: customer.status
        },
        detail_table: list,
      }
     
    
     
      dispatch(createSale(newData))
      

    }else{
      setError('Please Fill all fields')
    }   
    } catch (error) {
      console.log(error);
    }


  }

  
  const handlePrint = useReactToPrint({
    content:() => componentRef.current,

  })
  const handleNew = ()=>{
    localStorage.removeItem("productList")
    dispatch(resetState())
    setItemList([])
   setCustomer({
    vr_no: "",
    ac_name: "",
    status: "A"
   })
  }

  return (
    <div className={styles.newSale}>

      <div className={styles.newContainer}>

        <div className={styles.top}>
          <div className={styles.formTop}>
          <div className={styles.one}>
            <div className={styles.formInput} >
              <label>Vr No</label>
              <input type="text" name="vr_no" value={customer.vr_no} placeholder="Vr_No"
                onChange={handleHeader} autoComplete="off"
              />
            </div>
         
            <div className={styles.formInput} >
              <label>Date</label>
              <input type="text" name="vr_date" value={vr_date.format("DD-MM-YYYY")} readOnly

              />
            </div>
           
            <div className={styles.formInput} >
              <label>Status</label>
              <select name="status" value={customer.status} onChange={handleHeader} >
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </select>

            </div>
            </div>
            <div className={styles.two}>
           
            <div className={`${styles.formInput} ${styles.customer}`} >
              <label>Customer</label>
              <input type="text" name="ac_name" value={customer.ac_name} placeholder="Customer name"
                onChange={handleHeader} autoComplete="off"
              />
            </div>
         
            <div className={`${styles.formInput} ${styles.gtotal}`} >
            <label>Total ₹</label>
              <input type="text" value={getGrandtotal()} readOnly/>
            </div>
       
            </div>
            <div className={styles.error}>
              <p className={error ? styles.errorText :styles.noError  }>{error}</p>
            </div>
          </div>
        
        </div>
        <div className={styles.bottom}>

          <SForm setItemList={setItemList}
           
            itemList={itemList}
            info={info}
            editProduct={editProduct}
            setInfo={setInfo}
            addItems={addItems}
            handleChange={handleChange}
            total={total}


          />

        </div>
        {
          itemList.length > 0 && (
            <div className={styles.footer}>
              <SItemsList setItemList={setItemList}
                setInfo={setInfo}
                itemList={itemList}
                info={info}
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                className="two"
              />

              <div className={styles.buttonbox}>
            
                <button onClick={handleClick} className={styles.Button}>Save</button>
                <button onClick={handleNew} className={styles.Button}>New</button>
               { createdSale && isSuccess &&<button className={styles.printButton}  onClick={handlePrint}>Print</button>}
                
              </div>

            </div>
          )
        }
      { createdSale && isSuccess ?  (<div className={styles.invoiceContent} >
          <div className={styles.invoiceWrapper} ref={componentRef}>
            <div className={styles.invoice} >
              <Invoice printdata={createdSale} />
            </div>
          </div>
        </div>) : ''}
    </div>
    </div>
    

  );
};

export default NewSales;
