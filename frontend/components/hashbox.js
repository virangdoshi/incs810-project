import React, { useState } from 'react'
import Upload from 'src/components/upload'

import checksum from 'src/lib/checksum'
import fileregistry from 'src/lib/fileregistry'

const hashbox = () => {

  const [state, setState] = useState({
    hash: '',
    blockResults: {},
    contractOwner: __CONTRACT_OWNER__,
  }, [])
  
  const onChangeHandler = async event => {
    event.preventDefault();
    const [file] = event.target.files;
    const hash = await checksum(file)
    const blockResults = await fileregistry(hash, state.contractOwner)
    setState({
      ...state,
      hash,
      blockResults
    })
  }

  return (
    <div>
      <p>Hash: {state.hash}</p>
      <p>Block Results:</p>
      <table>
        <tbody>
          {Object.entries(state.blockResults).map(([k,v], i) => <tr key={i}>
              <td>{k}</td>
              <td>{JSON.stringify(v)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Upload 
        onChangeHandler={onChangeHandler} />
    </div>
  )
}

export default hashbox
