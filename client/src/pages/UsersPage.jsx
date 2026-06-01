import { useEffect, useState } from 'react'
import DataTable from '../components/table/DataTable'
import api from '../api/axios'
import Loading from '../utils/Loading'
import PiArrowClockWiseIcon from '../assets/icons/PiArrowClockWiseIcon'
import { NavLink, useParams } from 'react-router'
import CreateBoxIconNew from '../assets/icons/CreateBoxIconNew'

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)

  const getUsers = () => {
    setLoading(true)

    api
      .get('/users')
      .then((response) => {
        setUsers(response.data.data.list || [])
        setColumns(response.data.data.columns || [])
      })
      .catch((error) => {
        console.error(error?.response?.data?.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="">
      {loading ? <Loading /> : null}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Users</h3>

          <p className="text-slate-500">Manage system users</p>
        </div>
      </div>
      <div className="flex items-center justify-end mb-4">
        <button
          className="size-8 shadow-sm focus:shadow-inner rounded-full border hover:border-muted inline-flex items-center justify-center cursor-pointer transition-all border-white bg-white text-info  before:pointer-events-none"
          onClick={() => getUsers()}
          type="button"
        >
          <span className="shrink-0 size-4">
            <PiArrowClockWiseIcon color="#183b87" />
          </span>
        </button>
        <NavLink to={'/users/add'} className="ml-4">
          <button
            className="size-8 shadow-sm focus:shadow-inner rounded-full border hover:border-muted inline-flex items-center justify-center cursor-pointer transition-all border-white bg-white text-info  before:pointer-events-none"
            type="button"
          >
            <span className="shrink-0 size-4">
              <CreateBoxIconNew color="#183b87" />
            </span>
          </button>
        </NavLink>
      </div>
      <DataTable data={users} columns={columns} loading={loading} deleteUrl="/users" onRefresh={getUsers} />
    </div>
  )
}

export default UsersPage
