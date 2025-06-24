export const config = {
    Domain : import.meta.env.VITE_DOMAIN,
    Environment: import.meta.env.VITE_ENVIRONMENT || "production",
    Url : import.meta.env.VITE_URL || "https://www.userbird.com",
    LogoUrl: import.meta.env.VITE_LOGOURL || "https://www.userbird.com/logo.svg",
    SiteURL: import.meta.env.VITE_SITE_URL || "https://www.staging.userbird.com",
    APIUrl: import.meta.env.VITE_API_URL || "https://staging-api.userbird.com/api/profile/",
    LogoWidth: import.meta.env.VITE_LOGOWIDTH || "24px",
    LogoHeight: import.meta.env.VITE_LOGOHEIGHT || "24px",  
    LogoAlt: import.meta.env.VITE_LOGOALT || "UserBird Logo",
    Localhost: import.meta.env.VITE_LOCALHOST || "localhost:5173",
};