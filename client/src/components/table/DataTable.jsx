import React from 'react'
import ReactTable from './ReactTable'

const DataTable = ({ data, columns, prefix, onRefresh, onFilter, onClickDetail, createUrl = '', deleteUrl = '' }) => {
  return (
    <>
      <ReactTable dataRows={data} dataColumns={columns} prefix={prefix} deleteUrl={deleteUrl} onRefresh={onRefresh} />
    </>
  )
}

export default DataTable
