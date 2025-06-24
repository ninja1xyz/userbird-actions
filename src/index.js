import { logoRender } from "./assets/logoRender.js";
import { config } from "./config/config.js";
export class UserBirdToolbar {
  constructor() {
    this.siteId = null;
    this.workspaceId = null;
    this.logoSvg = null;
    this.apiToken = null;
    this.toolbar = null;
    this.logoRender = null;
    this.config = null;
  }

  async setupImports() {
    this.config = config;
    this.logoSvg = logoRender("www." + this.Domain + "/");
  }

  getApiUrl() {
    return this.config.APIUrl;
  }

  getSiteUrl() {
    return this.config.SiteURL;
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

    //reverse the conditional for production and staging
    const dashboardUrl = `${this.getSiteUrl()}${
      this.workspaceId
    }/site/${this.siteId}`;
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

   bindEvent(window) { 
    window.addEventListener('message', 
    (event) => {
      if (event.origin !== import.meta.env.VITE_SITE_URL) return; 
      const key = JSON.parse(event.data);
      console.log(event.data);
      this.cb(key);
      event.source.postMessage({ type: 'RESPONSE', text: 'Authenticated!' },event.origin);
        }
      ) 
    }

  cb = (key) => { 
    this.apiToken = key.token;
    this.siteId = key.siteId;
    this.workspaceId = key.workspaceId;
    this.init();
  }
  async init() {
    this.setupImports().then(async () => {
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
    });
  }
}

export default UserBirdToolbar;

