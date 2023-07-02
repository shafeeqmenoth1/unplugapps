import React from 'react'
import styles from './invoice.module.scss'



function Invoice({printdata}) {
 



  return (
    <>
   

      <div className={styles.invoiceContainer}>

      <h2>Invoice</h2>
     <div className={styles.header}>
     
      <div className={styles.left}>
          
          <h4>#Invoice No: {printdata?.header_table?.vr_no}</h4>
          <h4>To:{printdata?.header_table?.ac_name}</h4>
          <h4 className={`${styles.status}
           ${printdata?.header_table?.status === "A" ? styles.active : printdata?.header_table?.status === 'I' ? styles.inactive  : ''}`}>{printdata?.header_table?.status === "A" ? 'Active' : printdata?.header_table?.status === 'I' ? 'Inactive' : ''}</h4>
        
      </div>
      <div className={styles.right}>
     
          <h4 className={styles.date}>{printdata?.header_table?.vr_date}</h4>
          <h4 className={styles.rate}>Total: ₹{printdata?.header_table?.ac_amt}</h4>
         
      </div>
     </div>
     <div className={styles.body}>
        <div className={styles.bodyHeader}>
          <span>SL.No</span>
          <span>Code</span>
          <span>Items</span>
          <span>Qty</span>
          <span>Rate ₹</span>
        </div>
        {
          printdata?.detail_table?.map((item)=>(
            <div key={item.sr_no} className={styles.itemBody}>
              <div className={styles.item}>
              {item.sr_no}
              </div>
              <div className={styles.item}>
              {item.item_code}
              </div>
              <div className={styles.item}>
              {item.item_name}
              </div>
              <div className={styles.item}>
              {item.qty}
              </div>
              <div className={styles.item}>
              {item.rate}
              </div>
        
            </div>
          ))
        }
     </div>
          <div className={styles.footer}>
            <div className={styles.left}>

            </div>
             <div className={styles.right}>
              <div className={styles.item}>
                <div className={styles.amount}><h4>Subtotal: </h4><span>₹{printdata?.header_table?.ac_amt}</span></div>
                <div className={styles.amount}><h4>Tax: </h4><span>₹0</span></div>
                </div>
                <div className={`${styles.item} ${styles.gamountDiv}`}>
                <div className={styles.amount}><h4>Grand Total: </h4><span className={styles.gamount}>₹{printdata?.header_table?.ac_amt}</span></div>
               
                </div>
            </div>
          </div>
     </div>
       
    
  
    </>
  )
}

export default Invoice