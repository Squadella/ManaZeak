import SceneView from '../utils/SceneView';
'use strict';


class UserPageView extends SceneView {


  constructor(options) {
    super(options);

    this._fetchWrapper('/fragment/user-profile/')
      .then(this._buildView)
      .then(this._viewReady)
      .catch(error => {
        Logger.raise(error);
      });
  }


  destroy() {
    super.destroy();
    Utils.removeAllObjectKeys(this);
  }


  _buildView() {
    /* Append service style into document */
    Utils.appendLinkInHead('static/dist/css/userprofile.bundle.css');
  }


}


export default UserPageView;