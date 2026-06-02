import React from 'react'
import ReactTable from './ReactTable'
import Pagination from './Pagination'

const DataTable = ({
  data,
  columns,
  prefix,
  onRefresh,
  onFilter,
  onClickDetail,
  createUrl = '',
  deleteUrl = '',
  updateUrl = '',
  page,
  setPage,
  limit,
  setLimit,
  totalItems,
  totalPages,
}) => {
  return (
    <>
      <ReactTable
        dataRows={data}
        dataColumns={columns}
        prefix={prefix}
        deleteUrl={deleteUrl}
        onRefresh={onRefresh}
        updateUrl={updateUrl}
      />
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </>
  )
}

export default DataTable
