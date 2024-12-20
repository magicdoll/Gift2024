
import { Fragment, useEffect, useRef, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Dropdown, Modal } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../../common/loading'
import store from '../../common/redux/store'
import { Link } from 'react-router-dom'
import { ThemeChanger, SetUserAuthen } from '../../common/redux/action'
import Imagesdata from '../../common/imagesdata'
import { fnGetUserAuthen } from '../../common/api/api'

const Header = ({ local_varaiable, ThemeChanger, SetUserAuthen }) => {
  const userAuthenState = useSelector((state) => state.userAuthen)
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect( () => {
    if (!userAuthenState.isauthen && location.pathname != "/") {
      navigate("/")
    } else if (!userAuthenState.isauthen && location.pathname == "/") {
      fnHandleGetUserAuthen()
    } else if (userAuthenState.isauthen) {
      const now = new Date()
      const expiredate = new Date(userAuthenState.expiredate)
      if (now > expiredate) {
        SetUserAuthen({ username: 'Login Please', userpermission: [], expiredate: null, isauthen: false })
      }
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fnHandleGetUserAuthen = () => {
    setIsLoading(true)
    fnGetUserAuthen().then((result) => {
      if (result && result.result && result.statuscode && result.statuscode < 400) {
        SetUserAuthen({ username: result.result.user_id || 'Login Please', isauthen: (result.result.user_id ? true : false), expiredate: new Date(Date.now() +  8 * 60 * 60 * 1000).toISOString(), userpermission: result.result.functions })
      } else if (result.statuscode && result.statuscode >= 400) {
        toast.error(`API - GetUserAuthen`, { autoClose: 3000 })
      }
      setIsLoading(false)
    })
  }

  //full screen
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  //Endfull screen

  ///handleResize
  function menuClose() {
    const theme = store.getState();
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
      } else {
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  ///End handleResize

  const toggleSidebar = () => {
    const theme = store.getState();
    let sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, "toggled": "", "iconOverlay": '' });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, "toggled": "icon-overlay-close", "iconOverlay": '' });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            ThemeChanger({ ...theme, "dataNavStyle": "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, "toggled": "double-menu-close" });
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                ThemeChanger({ ...theme, "toggled": "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active");
                } else {

                  ThemeChanger({ ...theme, "toggled": "double-menu-close" });
                  // ThemeChanger({ ...theme, "toggled": "" });
                }
              }
            }
            // doublemenu(ThemeChanger);
            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, "toggled": "", "iconOverlay": '' });
            } else {
              ThemeChanger({ ...theme, "toggled": "detached-close", "iconOverlay": '' });
            }

            break;

          // default
          case "default":
            ThemeChanger({ ...theme, "toggled": "" });
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.toggled === "menu-click-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            }
            else {
              ThemeChanger({ ...theme, "toggled": "menu-click-closed" });
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (theme.toggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "menu-hover-closed" });

            }
            break;
          case "icon-click":
            if (theme.toggled === "icon-click-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-click-closed" });

            }
            break;
          case "icon-hover":
            if (theme.toggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, "toggled": "" });
            } else {
              ThemeChanger({ ...theme, "toggled": "icon-hover-closed" });

            }
            break;

        }
      }
    }
    else {
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, "toggled": "open" });

        setTimeout(() => {
          if (theme.toggled == "open") {
            const overlay = document.querySelector("#responsive-overlay");

            if (overlay) {
              overlay.classList.add("active");
              overlay.addEventListener("click", () => {
                const overlay = document.querySelector("#responsive-overlay");

                if (overlay) {
                  overlay.classList.remove("active");
                  menuClose();
                }
              });
            }
          }

          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector("#responsive-overlay");

              if (overlay) {
                overlay.classList.remove("active");
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, "toggled": "close" });
      }
    }



  };

  // Toggle Dark
  const ToggleDark = () => {

    ThemeChanger({
      ...local_varaiable,
      "dataThemeMode": local_varaiable.dataThemeMode == 'dark' ? 'light' : 'dark',
      "dataHeaderStyles": "transparent",
      "dataMenuStyles": local_varaiable.dataThemeMode == 'dark' ? 'light' : 'dark'

    });
    const theme = store.getState();

    if (theme.dataThemeMode != 'dark') {

      ThemeChanger({
        ...theme,
        "bodyBg1": '',
        "bodyBg2": '',
        "Light": '',
        "Formcontrol": '',
        "Graycolor": '',
        "inputBorder": '',
        "dataMenuStyles": '',
      });
      localStorage.setItem("mamixlighttheme", "light");
      localStorage.removeItem("mamixdarktheme");
      localStorage.removeItem("mamixMenu");
      localStorage.removeItem("mamixHeader");
    }
    else {
      localStorage.setItem("mamixdarktheme", "dark");
      localStorage.removeItem("mamixlighttheme");
      localStorage.removeItem("mamixMenu");
      localStorage.removeItem("mamixHeader");
    }

  };
  // End Toggle Dark

  useEffect(() => {
    const navbar = document?.querySelector(".header");
    const navbar1 = document?.querySelector(".app-sidebar");
    const sticky = navbar?.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar?.classList.add("sticky-pin");
        navbar1?.classList.add("sticky-pin");
      } else {
        navbar?.classList.remove("sticky-pin");
        navbar1?.classList.remove("sticky-pin");
      }
    }

    window.addEventListener("scroll", stickyFn);
    window.addEventListener("DOMContentLoaded", stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyFn);
      window.removeEventListener("DOMContentLoaded", stickyFn);
    };
  }, []);

  //Switcher
  const Switchericon = () => {
    document.querySelector(".offcanvas-end")?.classList.toggle("show");
    if (document.querySelector(".switcher-backdrop")?.classList.contains("d-none")) {
      document.querySelector(".switcher-backdrop")?.classList.add("d-block");
      document.querySelector(".switcher-backdrop")?.classList.remove("d-none");
    }
  };
  //cart dropdown

  const searchRef = useRef(null);

  const handleClick = (event) => {
    const searchInput = searchRef.current;

    if (searchInput && (searchInput === event.target || searchInput.contains(event.target))) {
      document.querySelector(".header-search")?.classList.add("searchdrop");
    } else {
      document.querySelector(".header-search")?.classList.remove("searchdrop");
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const clickHandler = (_event) => {
      const searchResult = document.querySelector(".search-result");
      if (searchResult) {
        searchResult.classList.add("d-none");
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <Fragment>
      <Loading loading={isLoading} />
      <header className="app-header sticky" id="header">
        {/* Start::main-header-container */}
        <div className="main-header-container container-fluid">

          {/* Start::header-content-left */}
          <div className="header-content-left">
          
            {/* Start::header-element */}
            <div className="header-element">
              <div className="horizontal-logo">
                <Link to={`${import.meta.env.BASE_URL}`} className="header-logo">
                  <img src={Imagesdata("autolivlogocolor")} alt="logo" className="desktop-logo" />
                  <img src={Imagesdata("togglelogo")} alt="logo" className="toggle-logo" />
                  <img src={Imagesdata("autolivlogo")} alt="logo" className="desktop-dark" />
                  <img src={Imagesdata("toggledark")} alt="logo" className="toggle-dark" />
                </Link>
              </div>
            </div>
            {/* End::header-element */}

            {/* Start::header-element */}
            <div className="header-element mx-lg-0 mx-2" onClick={() => toggleSidebar()}>
              <Link aria-label="Hide Sidebar" className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" data-bs-toggle="sidebar" to="#"><span></span></Link>
            </div>
            {/* End::header-element */}
          </div>
          {/* End::header-content-left */}

          {/* Start::header-content-center */}
          <div className="header-content-center">
            {/* Start::header-element */}
            <div className="header-element">
              <div className="horizontal-logo">
                <Link to={`${import.meta.env.BASE_URL}inventory`} className="header-logo">
                  <h2 className='text-white'>{/* Autolive React Template */}</h2>
                </Link>
              </div>
            </div>
            {/* End::header-element */}
          </div>
          {/* End::header-content-center */}

          {/* Start::header-content-right */}
          <ul className="header-content-right">

            {/* Start::header-element */}
            <li className="header-element d-md-none d-block">
              <Link to="#" className="header-link" data-bs-toggle="modal" onClick={handleShow} data-bs-target="#header-responsive-search">
                {/* Start::header-link-icon */}
                <i className="bi bi-search header-link-icon lh-1"></i>
                {/* End::header-link-icon */}
              </Link>
            </li>
            {/* End::header-element */}

            {/* Start::header-element */}
            <li className="header-element header-theme-mode">
              {/* Start::header-link|layout-setting */}
              <Link to="#" className="header-link layout-setting" onClick={() => ToggleDark()}>
                <span className="light-layout">
                  {/* Start::header-link-icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M98.31,130.38ZM94.38,17.62h0A64.06,64.06,0,0,1,17.62,94.38h0A64.12,64.12,0,0,0,55,138.93h0a44.08,44.08,0,0,1,43.33-8.54,68.13,68.13,0,0,1,45.47-47.32l.15,0c0-1,.07-2,.07-3A64,64,0,0,0,94.38,17.62Z" opacity="0.1"></path><path d="M164,72a76.45,76.45,0,0,0-12.36,1A71.93,71.93,0,0,0,96.17,9.83a8,8,0,0,0-9.59,9.58A56.45,56.45,0,0,1,88,32,56.06,56.06,0,0,1,32,88a56.45,56.45,0,0,1-12.59-1.42,8,8,0,0,0-9.59,9.59,72.22,72.22,0,0,0,32.29,45.06A52,52,0,0,0,84,224h80a76,76,0,0,0,0-152ZM29.37,104c.87,0,1.75,0,2.63,0a72.08,72.08,0,0,0,72-72c0-.89,0-1.78,0-2.67a55.63,55.63,0,0,1,32,48,76.28,76.28,0,0,0-43,43.4A52,52,0,0,0,54,129.59,56.22,56.22,0,0,1,29.37,104ZM164,208H84a36,36,0,1,1,4.78-71.69c-.37,2.37-.63,4.79-.77,7.23a8,8,0,0,0,16,.92,58.91,58.91,0,0,1,1.88-11.81c0-.16.09-.32.12-.48A60.06,60.06,0,1,1,164,208Z"></path></svg>
                  {/* End::header-link-icon */}
                </span>
                <span className="dark-layout" >
                  {/* Start::header-link-icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M131.84,84.41v0a68.22,68.22,0,0,0-41.65,46v-.11a44.08,44.08,0,0,0-38.54,5h0a48,48,0,1,1,80.19-50.94Z" opacity="0.1"></path><path d="M156,72a76.2,76.2,0,0,0-20.26,2.73,55.63,55.63,0,0,0-9.41-11.54l9.51-13.57a8,8,0,1,0-13.11-9.18L113.22,54A55.9,55.9,0,0,0,88,48c-.58,0-1.16,0-1.74,0L83.37,31.71a8,8,0,1,0-15.75,2.77L70.5,50.82A56.1,56.1,0,0,0,47.23,65.67L33.61,56.14a8,8,0,1,0-9.17,13.11L38,78.77A55.55,55.55,0,0,0,32,104c0,.57,0,1.15,0,1.72L15.71,108.6a8,8,0,0,0,1.38,15.88,8.24,8.24,0,0,0,1.39-.12l16.32-2.88a55.74,55.74,0,0,0,5.86,12.42A52,52,0,0,0,76,224h80a76,76,0,0,0,0-152ZM48,104a40,40,0,0,1,72.54-23.24,76.26,76.26,0,0,0-35.62,40,52.14,52.14,0,0,0-31,4.17A40,40,0,0,1,48,104ZM156,208H76a36,36,0,1,1,4.78-71.69c-.37,2.37-.63,4.79-.77,7.23a8,8,0,0,0,16,.92,58.91,58.91,0,0,1,1.88-11.81c0-.16.09-.32.12-.48A60.06,60.06,0,1,1,156,208Z"></path></svg>
                  {/* End::header-link-icon */}
                </span>
              </Link>
              {/* End::header-link|layout-setting */}
            </li>
            {/* End::header-element */}

            {/* Start::header-element */}
            <li className="header-element header-fullscreen">
              {/* Start::header-link */}
              <a
                // onclick="openFullscreen();"
                href="#" className="header-link" onClick={() => toggleFullscreen()}>
                {isFullscreen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="full-screen-close header-link-icon " width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,48V96L160,48ZM48,208H96L48,160Z" opacity="0.1"></path><path d="M208,40H160a8,8,0,0,0-5.66,13.66L172.69,72l-34.35,34.34a8,8,0,0,0,11.32,11.32L184,83.31l18.34,18.35A8,8,0,0,0,216,96V48A8,8,0,0,0,208,40Zm-8,36.69L179.31,56H200Zm-93.66,61.65L72,172.69,53.66,154.34A8,8,0,0,0,40,160v48a8,8,0,0,0,8,8H96a8,8,0,0,0,5.66-13.66L83.31,184l34.35-34.34a8,8,0,0,0-11.32-11.32ZM56,200V179.31L76.69,200Z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className=" full-screen-open header-link-icon" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,48V88L168,48ZM48,208H88L48,168Zm160,0V168l-40,40ZM48,88,88,48H48Z" opacity="0.1"></path><path d="M208,40H168a8,8,0,0,0-5.66,13.66l40,40A8,8,0,0,0,216,88V48A8,8,0,0,0,208,40Zm-8,28.69L187.31,56H200ZM53.66,162.34A8,8,0,0,0,40,168v40a8,8,0,0,0,8,8H88a8,8,0,0,0,5.66-13.66ZM56,200V187.31L68.69,200Zm155.06-39.39a8,8,0,0,0-8.72,1.73l-40,40A8,8,0,0,0,168,216h40a8,8,0,0,0,8-8V168A8,8,0,0,0,211.06,160.61ZM200,200H187.31L200,187.31ZM88,40H48a8,8,0,0,0-8,8V88a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,88,40ZM56,68.69V56H68.69Z"></path></svg>
                )}
              </a>
              {/* End::header-link */}
            </li>
            {/* End::header-element */}

            {/* Start::header-element */}
            <li className="header-element">
              {/* Start::header-link|switcher-icon */}
              <Link to="#" className="header-link switcher-icon" data-bs-toggle="offcanvas" data-bs-target="#switcher-canvas" onClick={() => Switchericon()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M230.1,108.76,198.25,90.62c-.64-1.16-1.31-2.29-2-3.41l-.12-36A104.61,104.61,0,0,0,162,32L130,49.89c-1.34,0-2.69,0-4,0L94,32A104.58,104.58,0,0,0,59.89,51.25l-.16,36c-.7,1.12-1.37,2.26-2,3.41l-31.84,18.1a99.15,99.15,0,0,0,0,38.46l31.85,18.14c.64,1.16,1.31,2.29,2,3.41l.12,36A104.61,104.61,0,0,0,94,224l32-17.87c1.34,0,2.69,0,4,0L162,224a104.58,104.58,0,0,0,34.08-19.25l.16-36c.7-1.12,1.37-2.26,2-3.41l31.84-18.1A99.15,99.15,0,0,0,230.1,108.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.1"></path><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A111.92,111.92,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.63a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.1,8.1,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8,8,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z"></path></svg>
              </Link>
              {/* End::header-link|switcher-icon */}
            </li>
            {/* End::header-element */}

            {/* Start::header-element */}
            <Dropdown className="header-element dropdown">
              {/* Start::header-link|dropdown-toggle */}
              <Dropdown.Toggle variant='' as="a" className="header-link dropdown-toggle no-caret" id="mainHeaderProfile" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                <div className="d-flex align-items-center">
                  <div className="me-xl-2 me-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"> <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/> <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/> </svg>
                  </div>
                  <div className="d-xl-block d-none lh-1">
                    <span className="fw-medium lh-1 fs-6">{userAuthenState.username}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
            </Dropdown>
            {/* End::header-element */}

          </ul>
          {/* End::header-content-right */}

        </div>
        {/* End::main-header-container  */}
      </header>
      <Modal show={show} onHide={handleClose} className="" id="header-responsive-search" tabIndex={-1} aria-labelledby="header-responsive-search" aria-hidden="true">
        {/* <div className="modal-content"> */}
        <Modal.Body>
          <div className="input-group">
            <input type="text" className="form-control border-end-0" placeholder="Search Anything ..."
              aria-label="Search Anything ..." aria-describedby="button-addon2" />
            <button className="btn btn-primary" type="button"
              id="button-addon2"><i className="bi bi-search"></i></button>
          </div>
        </Modal.Body>
        {/* </div> */}
      </Modal>

      <ToastContainer />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  local_varaiable: state
});
export default connect(mapStateToProps, { ThemeChanger, SetUserAuthen })(Header);