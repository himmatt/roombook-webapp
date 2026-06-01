import { useSelector } from 'react-redux'

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)

  return <header className="h-14 bg-white  px-6 flex items-center justify-between"></header>
}

export default Navbar
