import React from 'react'
import styles from "./sitemlist.module.scss"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

 const SItemsList = ({setItemList,itemList,setEditProduct}) => {


   const handleDelete=(row) => {
  
    setItemList(itemList.filter((item) => item.item_code !== row.item_code))
}

   const handleEdit = (row)=>{
    const findItem = itemList.find((item)=>{
     return item.item_code === row.item_code
    })
    setEditProduct(findItem)
  }
    
  return (
    <div>

<div className={styles.listContainer}>
          
<TableContainer  component={Paper}>
      <Table sx={{ minWidth: 1050}} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell sx={{ fontSize:'16px',fontWeight:'bold',paddingLeft:'50px' }} >Item Name</TableCell>
            <TableCell sx={{ fontSize:'16px',fontWeight:'bold' }}  align="right">Qty</TableCell>
            <TableCell sx={{ fontSize:'16px',fontWeight:'bold' }}  align="right">Price ₹</TableCell>
            <TableCell sx={{ fontSize:'16px',fontWeight:'bold' }}  align="right">Description</TableCell>
            <TableCell sx={{ fontSize:'16px',fontWeight:'bold',paddingRight:'50px' }}  align="right">Total ₹</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList?.map((row) => (
            <TableRow
              key={row.item_code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  sx={{ paddingLeft:'50px'}} component="th" scope="row">
                {row.item_name}
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell sx={{ paddingRight:'50px' }} align="right">{row.total}</TableCell>
              <TableCell className={styles.buttons} sx={{ paddingRight:'50px' }} align="right">
              <span className={styles.buttonEdit} onClick={()=>handleEdit(row)}>
                      <BorderColorIcon/>
                      </span>
                      <span className={styles.buttonDelete} onClick={()=>handleDelete(row)}>
                      <DeleteIcon/>
                      </span>
              </TableCell>
          
           
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
             
         
          </div>
    </div>
  )
}


export default SItemsList