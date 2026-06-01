import { useCallback, useEffect } from 'react'

function ExpandableRow({ data, openIndex, expandOrder }) {
  const allRowsExpand = () => {
    for (let i = 0; i < data.length; i += 1) {
      const getParent = document.getElementById(`expand${i}`)
      const getElement = getParent.querySelector(`#dataview-${i}`)
      getElement.style.display = 'contents'
    }
  }

  const loadExpandData = useCallback(() => {
    const getParent = document.getElementById(`expand${openIndex}`)
    const getElement = getParent.querySelector(`#dataview-${openIndex}`)
    getElement.style.display = 'contents'
    allRowsExpand()
  }, [openIndex])

  useEffect(() => {
    loadExpandData()
  }, [])

  return (
    <span className="w-full overflow-hidden">
      {data.length > 0 &&
        data.map((d, dataIndex) => (
          <span key={dataIndex} style={{ display: 'none' }} id={`dataview-${dataIndex}`} className="">
            {expandOrder.length > 0 &&
              expandOrder.map((value, index) => (
                <span
                  style={{
                    display: value.show === true ? '' : 'none',
                  }}
                  key={index}
                  className="h-7 flex border-b-[0.1px] border-gray-300 divide-x divide-gray-300"
                >
                  <span className="w-full basis-1/3 flex items-center justify-center">
                    <span className="text-center text-smallHeader uppercase">
                      {value.header !== undefined && value.header}
                    </span>
                  </span>
                  <span className="w-full basis-2/3 flex items-center">
                    <span className="pl-4 text-left text-content">{data[dataIndex][value.order]}</span>
                  </span>
                </span>
              ))}
          </span>
        ))}
    </span>
  )
}

export default ExpandableRow
