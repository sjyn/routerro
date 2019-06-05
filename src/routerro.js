class Router {
  constructor(contentHolderId) {
    this.routes = [];
    this.contentHolderId = contentHolderId;
    this._obeyHash = true;
    this._setupHashChange();
  }

  addRoute(route) {
    this.routes.push(route);
  }

  navigateToRoute(routeId) {
    window.location.hash = routeId;
    const route = this.routes.find((r) => r.id === routeId);
    if (!!route) {
      this._switchContent(route);
    } else {
      throw new Error(`Route id ${routeId} is not a registered route`);
    }
  }

  _setupHashChange() {
    window.onhashchange = function () {
      if (this._obeyHash) {
        const hash = window.location.hash.substr(1);
        try {
          this.navigateToRoute(hash);
        } catch (ignored) {

        }
      }
    }.bind(this);
  }

  _switchContent(route) {
    const {path} = route;
    const request = new XMLHttpRequest();
    const contentId = this.contentHolderId;
    request.onload = () => {
      document.getElementById(contentId).innerHTML = request.response;
    };
    request.open('GET', path);
    request.send()
  }
}

class Route {
  constructor(id, path) {
    this.id = id;
    this.path = path;
  }
}
