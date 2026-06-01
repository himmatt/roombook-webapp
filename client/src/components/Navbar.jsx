import { useSelector } from 'react-redux'

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)

  return <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between"></header>
}

export default Navbar
