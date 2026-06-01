import { useState, useEffect, Fragment, useMemo, useLayoutEffect, useCallback } from 'react'
import { useReactTable, getCoreRowModel, getExpandedRowModel, flexRender } from '@tanstack/react-table'
import PiCaretDoubleRightIcon from '../../assets/icons/PiCaretDoubleRightIcon'
import ExpandableRow from './ExpandableRow'
import ActionsCell from './ActionsCell'

import { useLocation, useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/slices/modalSlice'

// expander header cell to expand all rows
function ExpanderHeader({ toggleAllRowsExpanded, getIsAllRowsExpanded, rows, openAllExpand }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center"
      id="expand-all-btn"
      onClick={() => {
        const isAllExpanded = getIsAllRowsExpanded()
        toggleAllRowsExpanded(!isAllExpanded)
        openAllExpand(rows, isAllExpanded)
      }}
    >
      <span className="shrink-0 size-4">
        <PiCaretDoubleRightIcon color="#183b87" />
      </span>
    </button>
  )
}

// expander row cell to expand specific row
function ExpanderRow({ row, openExpand }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center"
      id={`expandBtn${row.index}`}
      onClick={(e) => {
        e.stopPropagation()
        openExpand(row.index, row.original)
      }}
    >
      <span className="icon-subContent cursor-default" id={`expandIcon${row.index}`}>
        <PiCaretDoubleRightIcon color="#183b87" />
      </span>
      {/* <TbChevronsRight
        className="icon-subContent cursor-pointer"
        id={`expandIcon${row.index}`}
      /> */}
    </button>
  )
}

const ReactTable = ({ dataRows, dataColumns, prefix, deleteUrl, onRefresh }) => {
  const prefixColumns = [
    {
      id: 'expander',
      header: ({ table }) =>
        ExpanderHeader({
          toggleAllRowsExpanded: table.toggleAllRowsExpanded,
          getIsAllRowsExpanded: table.getIsAllRowsExpanded,
          rows: table.getRowModel().rows,
          openAllExpand,
        }),
      size: 80,
      cell: ({ row }) => ExpanderRow({ row, openExpand }),
      show: true,
    },
  ]
  const lastColumns = [
    {
      id: 'actions',
      header: 'Actions',
      size: 100,
      cell: ({ row }) => {
        return (
          <div onClick={(e) => e.stopPropagation()} className="z-10">
            <ActionsCell
              key={row.original._id}
              id={row.original.id || row.original._id}
              prefix={prefix}
              deleteUrl={deleteUrl}
              onRefresh={onRefresh}
              rowData={row.original}
            />
          </div>
        )
      },
      show: !!deleteUrl,
    },
  ]
  // react table props
  const [hiddenColumns, setHiddenColumns] = useState([])
  const [globalColumn, setGlobalColumn] = useState([])
  const [columnStates, setColumnStates] = useState([...prefixColumns, ...globalColumn, ...lastColumns])
  const [expandedRow, setExpandedRow] = useState(0)
  const [expandColumnOrder, setExpandColumnOrder] = useState([{ order: '', show: true }])
  const [width, setWidth] = useState(0)

  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const params = useParams()
  const dispatch = useDispatch()

  // memoize data
  const data = useMemo(() => {
    const modifiedData = dataRows?.map((item) => {
      const newItem = { ...item }
      Object.keys(newItem).forEach((key) => {
        const value = newItem[key]
        const isDate = typeof value === 'string' && value.includes(':') && value.endsWith('Z')
        if (isDate) {
          const changedDate = new Date(value)
            .toLocaleString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
            .toLocaleUpperCase()
          newItem[key] = changedDate
        }
      })
      return newItem
    })

    return modifiedData
  }, [dataRows])

  // memoize columns
  const columns = useMemo(() => {
    let tempCols = columnStates?.filter((column) => column?.headerShown !== false && column?.show !== false)

    return tempCols?.map((column) => {
      return column
    })
  }, [columnStates])

  // react table instance
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    state: {
      columnVisibility: hiddenColumns.reduce((acc, colId) => {
        acc[colId] = false
        return acc
      }, {}),
    },
  })

  const openExpand = (e) => {
    setExpandedRow(e)
    const expand = document.getElementById(`expand${e}`)
    const icon = document.getElementById(`expandIcon${e}`)
    if (expand.style.display === 'none') {
      expand.style.display = 'contents'
      icon.style.transform = 'rotate(90deg)'
      icon.style.transition = '0.3s'
      return
    }
    expand.style.display = 'none'
    icon.style.transform = 'rotate(0deg)'
    icon.style.transition = '0.3s'
  }

  const openAll = (e) => {
    const expand = document.getElementById(`expand${e}`)
    const icon = document.getElementById(`expandIcon${e}`)
    expand.style.display = 'contents'
    icon.style.transform = 'rotate(90deg)'
    icon.style.transition = '0.3s'
  }

  const closeAll = (e) => {
    const expand = document.getElementById(`expand${e}`)
    const icon = document.getElementById(`expandIcon${e}`)
    expand.style.display = 'none'
    icon.style.transform = 'rotate(0deg)'
    icon.style.transition = '0.3s'
  }

  const openAllExpand = useCallback((e, isAllRowsExpanded) => {
    const rowsLength = e.length
    if (!isAllRowsExpanded) {
      const getExpandAllBtn = document.getElementById('expand-all-btn')
      getExpandAllBtn.style.transform = 'rotate(90deg)'
      getExpandAllBtn.style.transition = '0.3s'
      for (let i = 0; i < rowsLength; i += 1) {
        openAll(i)
      }
    } else {
      const getExpandAllBtn = document.getElementById('expand-all-btn')
      getExpandAllBtn.style.transform = 'rotate(0deg)'
      getExpandAllBtn.style.transition = '0.3s'
      for (let i = 0; i < rowsLength; i += 1) {
        closeAll(i)
      }
    }
  }, [])

  // set hidden columns
  const isHideCol = () => {
    const previousCol = []
    globalColumn?.map((value) => {
      if (value.show === false) {
        previousCol.push(value.accessorKey || value.id)
      }
      return null
    })
    if (JSON.stringify(previousCol) !== JSON.stringify(hiddenColumns)) {
      setHiddenColumns(previousCol)
    }
  }

  // set viewable columns
  const changeGlobal = () => {
    const defaultGlobal = dataColumns?.map((col, idx) => {
      const tempCol = {
        ...col,
        id: col.accessorKey || col.id || `col_${idx}`,
        accessorKey: col.accessorKey || col.id,
        show: true,
      }
      return tempCol
    })
    setGlobalColumn(defaultGlobal)
  }

  // set width as window width
  const updateSize = () => {
    setWidth(window.innerWidth)
  }

  // update width on event changes
  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    setWidth(window.innerWidth)
  }, [])

  // update viewable columns
  useEffect(() => {
    changeGlobal()
  }, [dataColumns])

  // update table width depends on width and column changes
  useEffect(() => {
    const tableWrapper = document.getElementById('customize-table')
    const wrapperWidth = tableWrapper?.offsetWidth
    const colNo = dataColumns?.length
    const colWithFixedWidth = dataColumns?.map((value) => (value.size ? value.size : 0))
    const fixedWidthTotal = colWithFixedWidth?.reduce((a, b) => a + b, 0)
    const colWithWidth = dataColumns?.filter((value) => value.size && value)
    const columnWithoutWidthTotal = colNo - colWithWidth?.length

    let approximateTableWidth = fixedWidthTotal + 200 * columnWithoutWidthTotal

    let i = 0
    const expandHeader = []

    let generatedCol = globalColumn

    if (approximateTableWidth > wrapperWidth) {
      do {
        i += 1
        expandHeader.unshift({
          order: globalColumn[globalColumn?.length - i]?.accessorKey,
          header: globalColumn[globalColumn?.length - i]?.header,
          show: globalColumn[globalColumn?.length - i]?.show,
          copyable: globalColumn[globalColumn?.length - i]?.copyable,
          headerShown: globalColumn[globalColumn?.length - i]?.headerShown,
        })
        setExpandColumnOrder(expandHeader)
        generatedCol = generatedCol.slice(0, globalColumn?.length - i)
        approximateTableWidth -= globalColumn[i]?.size ? globalColumn[i].size : 200
      } while (approximateTableWidth > wrapperWidth)

      setColumnStates([...prefixColumns, ...generatedCol, ...lastColumns])
      isHideCol()
    } else {
      setExpandColumnOrder([{ order: '', show: true }])
      setColumnStates([...prefixColumns, ...generatedCol, ...lastColumns])
      isHideCol()
    }
  }, [width, hiddenColumns, globalColumn])
  // console.log("table =>", table.getHeaderGroups());
  return (
    <div className="mb-4 text-[12px]" id="customize-table">
      <table className="w-full shadow-sm overflow-hidden rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
            <tr key={headerGroupIndex} className="h-8.5 bg-[#FAFAFA]">
              {headerGroup?.headers?.map((header, headerIndex) => {
                return (
                  <th
                    key={headerIndex}
                    style={{
                      width: header.getSize(),
                    }}
                    className="text-default uppercase text-[10px]"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className="px-4 text-content">
          {table.getRowModel().rows?.map((row, rowIndex) => {
            return (
              <Fragment key={row.id}>
                <tr
                  className={`h-8.5 ${rowIndex % 2 === 0 ? 'bg-[#F0F8FF]' : 'bg-card-color'} hover:bg-[#0043D81A] cursor-pointer`}
                  onClick={() => {
                    const original = row.original
                    const reasonRoutes = [
                      { key: 'usage', path: 'usage-logs' },
                      { key: 'top-up', path: 'top-up' },
                    ]
                    const matchedRoute = reasonRoutes.find((item) => item.key === original.reason)
                    const id = original.id || original._id
                    let path = ''

                    if (matchedRoute && original.relatedId) {
                      path = `${pathname}/${matchedRoute.path}/${original.relatedId}`
                    } else {
                      path = prefix ? `${pathname}/${prefix}/${id}` : `${pathname}/${id}`
                    }

                    {
                      params.id ? dispatch(openModal(path)) : navigate(path)
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <td key={index} className="text-content">
                        <span className="flex items-center justify-center">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      </td>
                    )
                  })}
                </tr>
                <tr id={`expand${row.index}`} style={{ display: 'none' }}>
                  <td
                    colSpan={row.getVisibleCells().length}
                    className={`${rowIndex % 2 === 0 ? 'bg-[#F0F8FF]' : 'bg-card-color'}`}
                  >
                    <ExpandableRow expandOrder={expandColumnOrder} openIndex={expandedRow} data={data} />
                  </td>
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReactTable
