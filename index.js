
class UserBirdToolbar {
  constructor({ siteId, workspaceId}) {
    this.siteId = siteId;
    this.workspaceId = workspaceId;
    this.logoSvg = null;
    this.apiToken = null;
    this.toolbar = null;
    this.logoRender =null
    this.config = null
    console.log(this)
  }

  async setupImports() {
     const {logoRender} = await import("./assets/logoRender.js");
     const {config}  = await import("./config/config.js");
     this.config = config
     this.logoSvg = logoRender("www."+this.domain+"/")
  }

  getApiTokenFromHash() {
    const url = new URLSearchParams(window.location.hash.substring(1));
    return url.get("birdAuth");
  }

  getApiUrl() {
    if (this.config.environment === "production") {
      return `https://api.${this.config.domain}/api/profile/`;
    } else {
      return `https://staging-api.${this.config.domain}/api/profile/`;
    }
  }

  getSiteUrl() {
    // if (this.config.environment === "production") {
    //   return `https://${this.config.domain}/api/profile/`;
    // } else {
    //   return `https://staging.${this.config.domain}/api/profile/`;
    // }
  }

  async fetchProfile() {
    const response = await fetch(this.getApiUrl(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.apiToken,
      },
    });
    return response.ok;
  }

  createToolbar() {
    this.toolbar = document.createElement("div");
    this.toolbar.id = "userbird-toolbar";
    Object.assign(this.toolbar.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#222",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      zIndex: "9999",
      cursor: "move",
    });

    const dashboardUrl = `${this.getSiteUrl() || "http://localhost:5173"}/${this.workspaceId}/site/${this.siteId}`;
    this.toolbar.innerHTML = `
      <div style="display:flex;justify-content:space-around;align-items:center;">
        <a style="text-decoration:none;color:white;" target="_blank" rel="noopener noreferrer">
          ${this.logoSvg.split("\n").join("")}
        </a>
        |
        <a href="${dashboardUrl}" style="text-decoration:none;color:white;padding-top:5px;margin-left:10px;" target="_blank" rel="noopener noreferrer">
          Dashboard
        </a>
      </div>
    `;
    document.body.appendChild(this.toolbar);
    this.makeDraggable();
  }

  makeDraggable() {
    this.toolbar.onmousedown = (e) => {
      e.preventDefault();
      const shiftX = e.clientX - this.toolbar.getBoundingClientRect().left;
      const shiftY = e.clientY - this.toolbar.getBoundingClientRect().top;

      const moveAt = (pageX, pageY) => {
        this.toolbar.style.left = pageX - shiftX + "px";
        this.toolbar.style.top = pageY - shiftY + "px";
        this.toolbar.style.right = "auto";
        this.toolbar.style.bottom = "auto";
        this.toolbar.style.position = "fixed";
      };

      const onMouseMove = (e) => moveAt(e.clientX, e.clientY);

      document.addEventListener("mousemove", onMouseMove);

      document.onmouseup = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
      };
    };

    this.toolbar.ondragstart = () => false;
  }

  async init() {
    this.setupImports().then(async () => {
this.apiToken = this.getApiTokenFromHash();
console.log(this.apiToken)
    if (
      this.apiToken &&
      this.siteId &&
      this.workspaceId &&
      (await this.fetchProfile())
    ) {
      this.createToolbar();
    } else {
      console.warn("UserBird Redirection Unauthenticated.");
    }
    })
    
  }
}

// Usage Docs for toolbar:
// const toolbar = new UserBirdToolbar({ siteId, workspaceId, apiToken });
// toolbar.init();