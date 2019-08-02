class Router {
  constructor(contentHolderId) {
    this.onHashChange = undefined;
    this.routes = [];
    this.contentHolderId = contentHolderId;
    this._obeyHash = true;
    this._setupHashChange();
  }

  addRoute(route) {
    this.routes.push(route);
  }

  navigateToRoute(routeId, switchCallback) {
    window.location.hash = routeId;
    const route = this.routes.find((r) => r.id === routeId);
    if (!!route) {
      this._switchContent(route, switchCallback);
    } else {
      throw new Error(`Route id ${routeId} is not a registered route`);
    }
  }

  _setupHashChange() {
    window.onhashchange = function () {
      if (this._obeyHash) {
        const hash = window.location.hash.substr(1);
        try {
          // noinspection JSPotentiallyInvalidUsageOfClassThis
          this.navigateToRoute(hash);
        } catch (ignored) {

        }
      }
      if (!!this.onHashChange) {
        this.onHashChange();
      }
    }.bind(this);
  }

  _switchContent(route, switchCallback) {
    const {path} = route;
    const request = new XMLHttpRequest();
    const contentId = this.contentHolderId;
    request.onload = () => {
      document.getElementById(contentId).innerHTML = request.response;
      if (!!switchCallback) {
        switchCallback();
      }
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
