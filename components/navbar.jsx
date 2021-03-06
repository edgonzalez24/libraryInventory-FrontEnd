import Link from 'next/link'
import React, {useState, useEffect} from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import { deauthenticate } from '../store/actions/authAction';
import { getNotifications, updateNotification } from '../store/actions/notificationsAction';
import {mainMenu, AdminMenu} from '../public/global'
import DarkMode from './DarkMode';

const Navbar = ({auth}) => {
  const dispatch = useDispatch();
  const {notifications} = useSelector(state =>state.notification);

  const [showMinUser, setShowMinUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); 
  const [ showPreview , setShowPreview] = useState(true)
  const [ preview , setPreview] = useState({});
  const [ active, setActive] = useState(0);

  // Close Session
  const handleLogout = () =>{
      dispatch(deauthenticate());
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const reviewNotification = notification => {
    setShowPreview(!setPreview);
    setPreview(notification);
  };
  const openStyle = (index) => {
    setActive(index);
  };

  const toggleNotification = preview => {
    setShowPreview(!showPreview)
    dispatch(updateNotification(preview._id));
  }

  const filterNotification = notifications.filter(item => item.status === true);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <div className="flex flex-wrap w-full bg_white_gray">
      {
        (showMenu) && (
          <nav className="sidebar lg:w-3/12 fixed z-20 h-screen animated slideInLeft">
            <div className="max-w-7xl mx-auto px-2 sm:px-6">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center ">
                  <DarkMode />
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0">
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                  </div>
                </div>
                {
                  (auth.token) && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <div className="relative">
                        <div>
                          <button className="p-1 border-2 border-transparent color_text rounded-full focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </button>
                          {
                            (notifications) && (
                              (notifications[notifications.length - 1].status === true) && (
                                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                  </span>
                              )
                            )
                          }
                        </div>
                        {
                          (showNotifications) && (
                            (filterNotification.length > 0) ? (
                              <div>
                                    <div className="origin-top-right absolute right-0 mt-2 w-64 h-32 rounded-md shadow-lg z-30 animated fadeIn  bg-white">
                                      <div className="py-1 rounded-md shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                          {
                                            (showPreview) ? (
                                                notifications.map((notification, index) => (
                                                  (notification.status !== false) && (
                                                      <a 
                                                      key={index}
                                                      href="#" 
                                                      className="block px-2 py-2 text-xs leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out bg-white" role="menuitem"
                                                      onClick={() => reviewNotification(notification)}>
                                                        Tiene una notificacion de: {notification.name} {notification.lastname}...
                                                      </a>
                                                    )
                                                ))
                                            ) : (
                                            <div className="px-2  bg-white">
                                              <div
                                                className="cursor-pointer text-gray-500 font-bold "
                                                onClick={() => toggleNotification(preview)}
                                              >
                                                X Regresar
                                              </div>
                                              <div className="block py-2 text-xs leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out animated fadeIn">
                                              Tiene una notificacion de: {preview.name} {preview.lastname}, quien solicita un prestamos del siguiente ejemplar: {preview.bookName} con codigo ISBN: {preview.isbn}
                                              </div>
                                            </div>
                                            )
                                          }
                                        </div>
                                      </div>
                                  </div>
                              ) : (
                                <div className="origin-top-right absolute right-0 mt-2 w-64 h-12 rounded-md shadow-lg z-30 animated fadeIn bg-white flex items-center justify-center">
                                  <p className=" text-center text-xs italic">No hay notificaciones por leer</p>
                                </div>
                              )
                          )
                        }
                      </div>
                      <div className="ml-3 relative">
                        <div>
                          <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true" onClick={() => setShowMinUser(!showMinUser)}>
                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </button>
                        </div>
                        {
                          (showMinUser) && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-30 animated fadeIn">
                              <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Mi Perfil</a>
                                <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Ajustes</a>
                                <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem" onClick={handleLogout}>Cerrar Sesion</a>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="block">
              <div className="px-2 pt-2 pb-3 flex flex-col">
                {
                  mainMenu.map((item, index) =>(
                      (auth.token && item.name === 'Iniciar Sesion') ? (
                        <>
                          <h2 className="text-xl w-56 color_text my-6 border-b border-white " key={index}>Menu de Administrador</h2>
                          {
                            AdminMenu.map((i, index) => (
                              <>
                              <div
                                key={index}
                                className="mt-1 block px-3 py-2 rounded-md text-base font-medium color_text focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out lg:text-xl cursor-pointer"
                                onClick={() => openStyle(index)}>
                                {i.name}
                              </div>
                              {
                                i.subMenu.map((sub) =>(
                                  <div className={active === index ? 'block animated fadeIn' : 'hidden'}>
                                    <Link
                                      href={sub.slug}
                                      >
                                      <a 
                                      onClick={ () => setShowMenu(!showMenu)}
                                      className='block -mt-2 w-64 px-3 py-2 rounded-md text-base font-medium color_text hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out pl-5'>
                                        <div  onClick={ () => handleClick()}>
                                        {sub.name}
                                        </div>
                                      </a>
                                    </Link>
                                  </div>
                                ))
                              }
                              </>
                            ))
                          }
                        </>
                      ) : (
                        <Link
                          href={item.slug}
                          key={index}
                          >
                          <a 
                          className="mt-1 w-64 block px-3 py-2 rounded-md text-base font-medium color_text hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out lg:text-xl"
                          onClick={ () => setShowMenu(!showMenu)}>
                            <div onClick={ () => handleClick()}>
                              {item.name}
                            </div>
                          </a>
                        </Link>
                      )
                  ))
                }
              </div>
            </div>
          </nav>
        ) 
      }
      <div className="absolute top-0 right-0 z-50">
        <div className="block cursor-pointer mt-4 mr-5 " onClick={ () => setShowMenu(!showMenu)}>
          <HamburgerMenu
            isOpen={open}
            menuClicked={handleClick}
            width={50}
            height={30}
            strokeLinecap={3}
            rotate={0}
            className="font-bold leading-tight"
            borderRadius={0}
            className="text-gray-500"
            animationDuration={0.5}
          />
        </div>
      </div>
    </div>
  )
}
Navbar.getInitialProps = async(ctx) => {
  await initialize(ctx);
}
export default  connect(state => state, actions) (Navbar);
