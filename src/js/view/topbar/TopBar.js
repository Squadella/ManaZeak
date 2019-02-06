import UserMenuContext from '../utils/contexts/UserMenuContext.js';
'use strict';


class TopBar {


  /**
   * @summary ManaZeak TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description <blockquote>Handle all components in the TopBar and all related events</blockquote>
   **/
  constructor() {
    /** @private
     * @member {object} - The TopBar DOM element */
    this._topbar = {};
    /** @private
     * @member {object} - The user avatar image DOM element */
    this._avatar = {};
    /** @private
     * @member {object} - The user context menu object */
    this._userMenu = {};

    this._init();
    this._events();
  }


  //  ------------------------------------------------------------------------------------------------//
  //  -------------------------------------  CLASS INTERNALS  --------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name _init
   * @private
   * @memberof TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Fill TopBar object with DOM object and create the UserMenu context
   **/
  _init() {
    this._topbar = document.getElementById('topbar');
    this._avatar = document.getElementById('topbar-avatar');

    this._userMenu = new UserMenuContext({
      target: this._topbar,
      url: 'contexts/usermenu/'
    });

    this._avatar.src = `../../${mzk.user.avatarPath}`; // Since img is in app/templates
  }


  /**
   * @method
   * @name _events
   * @private
   * @memberof TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Handle the UserMenu toggle state on avatar clicked
   **/
  _events() {
    this._avatar.addEventListener('click', this.toggleUserMenu.bind(this));
  }


  //  ------------------------------------------------------------------------------------------------//
  //  ----------------------------------------  USER MENU  -----------------------------------------  //
  //  ------------------------------------------------------------------------------------------------//


  /**
   * @method
   * @name toggleUserMenu
   * @public
   * @memberof TopBar
   * @author Arthur Beaulieu
   * @since September 2018
   * @description Toggle the UserMenu
   **/
  toggleUserMenu() {
    if (this._topbar.contains(this._userMenu.dom)) {
      this._userMenu.close();
    } else {
      this._userMenu.open();
    }
  }


}


export default TopBar;
