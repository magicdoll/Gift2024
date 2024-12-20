
import { Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeChanger } from "../../common/redux/action";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Menuloop({ MenuItems, toggleSidemenu, local_varaiable, level, HoverToggleInnerMenuFn }) {
  const userAuthenState = useSelector((state) => state.userAuthen)

  /*
  useEffect(() => {
    if (userAuthenState && userAuthenState.isauthen) {
      const arrFilterUserState = userAuthenState.userpermission.filter((item) => item.NAME == MenuItems.title).map((item) => { return item.FUNC_URL?.toLowerCase().replace('log/', 'report/') })
      MenuItems.children = MenuItems.children.filter((item) => arrFilterUserState?.some((itemsome) => item.path.indexOf(itemsome) > 0))
    }
  }, [userAuthenState])
  */

  const handleClick = (event) => {
    // Your logic here
    event.preventDefault(); // Prevents the default anchor behavior (navigation)
    // ... other logic you want to perform on click
  };

  return (
    <Fragment>
      <Link to="#" className={`side-menu__item ${MenuItems?.selected ? "active" : ""}`}
        onClick={(event) => { event.preventDefault(); toggleSidemenu(event, MenuItems); }} onMouseEnter={(event) => HoverToggleInnerMenuFn(event, MenuItems)}>
        <span className={`${local_varaiable?.dataVerticalStyle == 'doublemenu' ? '' : 'd-none'}`}>
          <OverlayTrigger placement="right" overlay={<Tooltip>{MenuItems.title}</Tooltip>}>
            <div>{MenuItems.icon}</div>
          </OverlayTrigger>
        </span>
        {local_varaiable?.dataVerticalStyle != "doublemenu" ? MenuItems.icon : ""}

        <span className={`${level == 1 ? "side-menu__label" : ""}`}> {MenuItems.title} {MenuItems.badgetxt ? (<span className={MenuItems.class}> {MenuItems.badgetxt} </span>
        ) : (
          ""
        )}
        </span>
        <i className="ri-arrow-down-s-line side-menu__angle"></i>
      </Link>
      <ul className={`slide-menu child${level}  ${MenuItems.active ? 'double-menu-active' : ''} ${MenuItems?.dirchange ? "force-left" : ""} `} style={MenuItems.active ? { display: "block" } : { display: "none" }}>
        {level <= 1 ? <li className="slide side-menu__label1">
          <Link to="#">{MenuItems.title}</Link>
        </li> : ""}
        {MenuItems.children.map((firstlevel, index) =>
          <li className={`${firstlevel.menutitle ? 'slide__category' : ''} ${firstlevel?.type == 'empty' ? 'slide' : ''} ${firstlevel?.type == 'link' ? 'slide' : ''} ${firstlevel?.type == 'sub' ? 'slide has-sub' : ''} ${firstlevel?.active ? 'open' : ''} ${firstlevel?.selected ? 'active' : ''}`} key={index}>
            {firstlevel.type === "link" ?
              <Link to={firstlevel.path} className={`side-menu__item ${firstlevel.selected ? 'active' : ''}`}>{firstlevel.icon}
                <span className=""> {firstlevel.title} {firstlevel.badgetxt ? (<span className={firstlevel.class}> {firstlevel.badgetxt}</span>
                ) : (
                  ""
                )}
                </span>
              </Link>
              : ""}
            {firstlevel.type === "empty" ?
              <Link to="#" className='side-menu__item' onClick={handleClick}> {firstlevel.icon}<span className=""> {firstlevel.title} {firstlevel.badgetxt ? (<span className={firstlevel.class}> {firstlevel.badgetxt} </span>
              ) : (
                ""
              )}
              </span>
              </Link>
              : ""}
            {firstlevel.type === "sub" ?
              <Menuloop MenuItems={firstlevel} toggleSidemenu={toggleSidemenu} HoverToggleInnerMenuFn={HoverToggleInnerMenuFn} level={level + 1} />
              : ''}

          </li>
        )}

      </ul>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Menuloop);
