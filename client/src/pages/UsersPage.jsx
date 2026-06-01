import { useEffect, useState } from 'react'
import DataTable from '../components/table/DataTable'
import api from '../api/axios'

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Users</h3>

          <p className="text-slate-500">Manage system users</p>
        </div>
      </div>

      <DataTable data={users} columns={columns} loading={loading} />
    </div>
  )
}

export default UsersPage
