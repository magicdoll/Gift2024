const PagesIcon = <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="32" height="32" viewBox="0 0 256 256"><path d="M224,56V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2"></path><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"></path></svg>
const NestedmenuIcon = <svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="32" height="32" viewBox="0 0 256 256"><path d="M224,80l-96,56L32,80l96-56Z" opacity="0.2"></path><path d="M230.91,172A8,8,0,0,1,228,182.91l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,36,169.09l92,53.65,92-53.65A8,8,0,0,1,230.91,172ZM220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09ZM24,80a8,8,0,0,1,4-6.91l96-56a8,8,0,0,1,8.06,0l96,56a8,8,0,0,1,0,13.82l-96,56a8,8,0,0,1-8.06,0l-96-56A8,8,0,0,1,24,80Zm23.88,0L128,126.74,208.12,80,128,33.26Z"></path></svg>

export const MenuItems = [
  { menutitle: "MAIN", },
  
  { path: `${import.meta.env.BASE_URL}menu1`, title: "Menu 1", icon: NestedmenuIcon, type: "link", active: false, selected: false, dirchange: false },

  {
    icon: PagesIcon, title: "Menu 2", type: "sub", active: false, selected: false,
    children: [
      { path: `${import.meta.env.BASE_URL}menu2/submenu1`, type: "link", active: false, selected: false, dirchange: false, title: "Menu 2 - Sub Menu 1" },
      { path: `${import.meta.env.BASE_URL}menu2/submenu2`, type: "link", active: false, selected: false, dirchange: false, title: "Menu 2 - Sub Menu 2" },
    ],
  },

];
