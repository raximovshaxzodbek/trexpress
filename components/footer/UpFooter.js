import React from 'react'

const someArr = new Array(14).fill(0).map((el, index) => {
    if(index % 2 === 0) {
        return <li>Lorem ipsum</li>
    } else return <li>Lorem</li>
}
    
    )

const firstCol = [someArr];
const secondCol = [someArr];
const thirdCol = [someArr];
const fourCol = [someArr];
const fifthCol = [someArr];




export const UpFooter = () => {
  return (
   <>
    <div className='mainUpFooter'>
      <div> <h1>Popular brands, stores and products</h1></div>
       <div className='upFooter'>
       <div className='upFooterItem'>
        {firstCol}
       </div>
       <div className='upFooterItem'>
        {secondCol}
       </div>
       <div className='upFooterItem'>
        {thirdCol}
       </div>
       <div className='upFooterItem'>
        {fourCol}
       </div>
       <div className='upFooterItem'>
        {fifthCol}
       </div>
       </div>
    </div>
   </>
  )
}
