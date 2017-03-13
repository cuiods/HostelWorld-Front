import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'

const topMenus = menu.map(item => item.key);
const getMenus = function (menuArray, userId, userType, siderFold, parentPath) {
  parentPath = parentPath || '/';
  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, userId, siderFold, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + userType=='register'?userId:'register' + '/' +item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
};

function Menus ({ siderFold, darkTheme, location, isNavbar, handleClickNavMenu, navOpenKeys, changeOpenKeys ,userId, userType}) {
  let menuItems = getMenus(menu, userId, userType, siderFold);
  if (userType == "member") {
    menuItems = menuItems.slice(0,5);
  } else if (userType == "hotel") {
    menuItems = menuItems.slice(5,11);
  } else if (userType == "manager") {
    menuItems = menuItems.slice(11,15);
  } else {
    menuItems = menuItems.slice(15);
  }

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1));
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  };
  const getAncestorKeys = (key) => {
    const map = {
      navigation2: ['navigation']
    };
    return map[key] || []
  };
  // 菜单栏收起时，不能操作openKeys
  let menuProps = !siderFold ? {
      onOpenChange,
      openKeys: navOpenKeys
    } : {};

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || 'hotelList']}>
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  isNavbar: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func
};

export default Menus
