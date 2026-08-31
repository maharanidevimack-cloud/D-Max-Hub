// Bharat ke sabse zyada use hone wale Top 60+ Apps (No Duplicates) with In-App Modal & Native Scheme Routing
const localApps = [
    // Social & Communication
    { name: "WhatsApp", domain: "whatsapp.com", scheme: "whatsapp://send" },
    { name: "Instagram", domain: "instagram.com", scheme: "instagram://app" },
    { name: "Facebook", domain: "facebook.com", scheme: "fb://facewebmodal/f?href=https://facebook.com" },
    { name: "Telegram", domain: "telegram.org", scheme: "tg://resolve" },
    { name: "Twitter / X", domain: "twitter.com", scheme: "twitter://timeline" },
    { name: "Snapchat", domain: "snapchat.com", scheme: "snapchat://" },
    { name: "ShareChat", domain: "sharechat.com" },
    { name: "Josh", domain: "myjosh.in" },
    { name: "Moj", domain: "mojapp.in" },
    { name: "LinkedIn", domain: "linkedin.com", scheme: "linkedin://" },
    { name: "Pinterest", domain: "pinterest.com", scheme: "pinterest://core/feed/" },
    { name: "Discord", domain: "discord.com", scheme: "discord://" },
    { name: "Signal", domain: "signal.org", scheme: "sgnl://" },
    { name: "Truecaller", domain: "truecaller.com", scheme: "truecaller://" },

    // Entertainment & Video
    { name: "YouTube", domain: "youtube.com", scheme: "vnd.youtube://" },
    { name: "Netflix", domain: "netflix.com", scheme: "nflx://www.netflix.com" },
    { name: "Spotify", domain: "spotify.com", scheme: "spotify://" },
    { name: "Disney+ Hotstar", domain: "hotstar.com", scheme: "hotstar://" },
    { name: "JioCinema", domain: "jiocinema.com" },
    { name: "MX Player", domain: "mxplayer.in" },
    { name: "Zee5", domain: "zee5.com" },
    { name: "SonyLIV", domain: "sonyliv.com" },
    { name: "Prime Video", domain: "primevideo.com", scheme: "primevideo://" },
    { name: "Wynk Music", domain: "wynk.in" },
    { name: "Gaana", domain: "gaana.com" },

    // AI & Search Tools
    { name: "Google", domain: "google.com" },
    { name: "ChatGPT", domain: "openai.com" },
    { name: "Gemini AI", domain: "google.com" },
    { name: "Mayabir AI", domain: "custom-ai", isCustom: true },
    { name: "Wikipedia", domain: "wikipedia.org" },
    { name: "Quora", domain: "quora.com" },
    { name: "Reddit", domain: "reddit.com", scheme: "reddit://" },
    { name: "Microsoft Copilot", domain: "copilot.microsoft.com" },
    { name: "Perplexity", domain: "perplexity.ai" },
    { name: "DeepL", domain: "deepl.com" },

    // UPI & Payments
    { name: "PhonePe", domain: "phonepe.com", scheme: "phonepe://" },
    { name: "Google Pay", domain: "pay.google.com", scheme: "tez://" },
    { name: "Paytm", domain: "paytm.com", scheme: "paytmmp://" },
    { name: "BHIM UPI", domain: "bhimupi.org.in" },
    { name: "Cred", domain: "cred.club" },
    { name: "MobiKwik", domain: "mobikwik.com" },

    // Shopping & E-Commerce
    { name: "Amazon", domain: "amazon.in", scheme: "com.amazon.mobile.shopping://" },
    { name: "Flipkart", domain: "flipkart.com", scheme: "flipkart://" },
    { name: "Meesho", domain: "meesho.com" },
    { name: "Myntra", domain: "myntra.com" },
    { name: "Ajio", domain: "ajio.com" },
    { name: "Nykaa", domain: "nykaa.com" },
    { name: "Zepto", domain: "zeptonow.com" },
    { name: "Blinkit", domain: "blinkit.com" },
    { name: "Swiggy Instamart", domain: "swiggy.com" },

    // Food & Travel
    { name: "Zomato", domain: "zomato.com", scheme: "zomato://" },
    { name: "Swiggy", domain: "swiggy.com", scheme: "swiggy://" },
    { name: "IRCTC Rail Connect", domain: "irctc.co.in" },
    { name: "MakeMyTrip", domain: "makemytrip.com" },
    { name: "OYO", domain: "oyorooms.com" },
    { name: "Uber", domain: "uber.com", scheme: "uber://" },
    { name: "Ola", domain: "olacabs.com", scheme: "olacabs://" },
    { name: "Rapido", domain: "rapido.bike" },

    // Productivity & Utilities
    { name: "Gmail", domain: "mail.google.com", scheme: "googlegmail://" },
    { name: "Google Drive", domain: "drive.google.com" },
    { name: "Google Maps", domain: "maps.google.com", scheme: "comgooglemaps://" },
    { name: "Google Translate", domain: "translate.google.com" },
    { name: "Canva", domain: "canva.com" },
    { name: "GitHub", domain: "github.com" },
    { name: "Calculator", domain: "calculator.net" }
];

const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');

// 1. Header Title ko "D-MAX HUB" set karna
let brandHeader = document.querySelector('.hub-header h1') || document.querySelector('h1');
if(brandHeader) {
    brandHeader.innerText = "D-MAX HUB";
}

// 2. Search Bar ke sath Clear (X) Button ka Setup
let searchWrapper = searchInput ? searchInput.parentNode : null;
let clearBtn = document.getElementById('clearSearchBtn');

if (searchWrapper && !clearBtn) {
    searchWrapper.style.position = 'relative';
    clearBtn = document.createElement('button');
    clearBtn.id = 'clearSearchBtn';
    clearBtn.innerHTML = '✕';
    clearBtn.style.cssText = "position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.1); border: none; border-radius: 50%; width: 22px; height: 22px; font-size: 11px; cursor: pointer; display: none; align-items: center; justify-content: center; color: #333;";
    searchWrapper.appendChild(clearBtn);

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        filterApps();
        searchInput.focus();
    });
}

// Master Duplicate Tracker Set
const renderedAppNames = new Set();

function createCardHTML(app) {
    let iconBoxContent = '';
    if (app.isCustom) {
        iconBoxContent = `
            <div class="icon-box" style="background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">
                🔮
            </div>
        `;
    } else {
        let faviconURL = `https://www.google.com/s2/favicons?domain=${app.domain}&sz=128`;
        iconBoxContent = `
            <div class="icon-box">
                <img src="${faviconURL}" alt="${app.name}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/128/f0f0f0/666666?text=${app.name.charAt(0)}';">
            </div>
        `;
    }
    return `${iconBoxContent}<span class="app-name">${app.name}</span>`;
}

// Initial Render with In-App Modal Viewer & Native App Switching Logic
function renderInitial() {
    if (!appGrid) return;
    appGrid.innerHTML = '';
    renderedAppNames.clear();
    const fragment = document.createDocumentFragment();
    
    localApps.forEach(app => {
        let cleanName = app.name.toLowerCase().trim();
        if (!renderedAppNames.has(cleanName)) {
            renderedAppNames.add(cleanName);
            
            const card = document.createElement('div');
            card.className = 'app-icon-card';
            card.style.cursor = 'pointer';
            card.innerHTML = createCardHTML(app);

            card.addEventListener('click', (e) => {
                e.preventDefault();
                if (app.isCustom) {
                    return; 
                }

                let webURL = `https://${app.domain}`;

                if (app.scheme) {
                    let fallbackTriggered = false;
                    let iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = app.scheme;
                    document.body.appendChild(iframe);

                    let timer = setTimeout(() => {
                        document.body.removeChild(iframe);
                        if (!fallbackTriggered) {
                            fallbackTriggered = true;
                            openInAppModal(app.name, webURL);
                        }
                    }, 600);

                    window.addEventListener('blur', () => {
                        clearTimeout(timer);
                        fallbackTriggered = true;
                        if (document.body.contains(iframe)) {
                            document.body.removeChild(iframe);
                        }
                    }, { once: true });
                } else {
                    openInAppModal(app.name, webURL);
                }
            });

            fragment.appendChild(card);
        }
    });
    appGrid.appendChild(fragment);
}

// In-App Modal Trigger Function
function openInAppModal(appName, url) {
    let modal = document.getElementById('appViewerModal');
    let titleEl = document.getElementById('viewerTitle');
    let iframe = document.getElementById('viewerFrame');

    if (modal && titleEl && iframe) {
        titleEl.innerText = appName;
        iframe.src = url;
        modal.style.display = 'flex';
    }
}

renderInitial();

// Search Filter & Clear Button Toggle System
function filterApps() {
    if (!searchInput || !appGrid) return;
    let query = searchInput.value.toLowerCase().trim();
    let cards = appGrid.getElementsByClassName('app-icon-card');
    
    if (clearBtn) {
        clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
    }

    Array.from(cards).forEach(card => {
        let nameEl = card.getElementsByClassName('app-name')[0];
        if (nameEl) {
            let name = nameEl.innerText.toLowerCase();
            card.style.display = name.includes(query) ? 'flex' : 'none';
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterApps);
}

// Home Screen Install Counter System (PWA Analytics)
window.addEventListener('appinstalled', (evt) => {
    let installCount = localStorage.getItem('dmax_hub_installs') || 0;
    installCount = parseInt(installCount) + 1;
    localStorage.setItem('dmax_hub_installs', installCount);
});
        
