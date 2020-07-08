import React from 'react'

const upload = ({onChangeHandler = () => {}}) => {
    return (
      <div>
         <input type="file" name="file" onChange={onChangeHandler}/>
      </div>
    )
}

export default upload
