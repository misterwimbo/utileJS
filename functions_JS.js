
/**
 * Vérifie si un JSON est valide
 * @param {json} str le JSON à vérifier
 * @returns {boolean}
 */
function IsValidJSON(str)
{
    if (str == "")
        return false;

    // Test le JSON si il n'est pas bon capture l'erreur;
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}

/**
 * Retourne la valeur du parametre GET passé en parametre dans l'url
 * équivalent à $_GET[] en php
 *
 * @param {string} param paramètre GET dans l'url
 * @returns {string} valueur du parametre GET
 */
function $_GET(param)
{
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? decodeURIComponent( vars[param] ) : null;
    }
    return vars;
}



/**
 * Vérifie si l'heure actuelle est comprise entre une heure de début et une heure de fin spécifiées.
 *
 * @param {string} startTime - Heure de début au format "HH:MM".
 * @param {string} endTime - Heure de fin au format "HH:MM".
 * @returns {boolean} - Retourne true si l'heure actuelle est comprise entre l'heure de début et l'heure de fin, sinon false.
 */
function isBetweenTimes(startTime, endTime) {
    try {
        // Obtenir l'heure actuelle
        var now = new Date();
        var currentHour = now.getHours();
        var currentMinutes = now.getMinutes();

        // Convertir les heures et minutes en nombre total de minutes depuis minuit
        var currentTimeInMinutes = currentHour * 60 + currentMinutes;

        // Extraire les heures et minutes des paramètres et convertir en minutes depuis minuit
        var startHour = parseInt(startTime.split(':')[0], 10);
        var startMinutes = parseInt(startTime.split(':')[1], 10);
        var startTimeInMinutes = startHour * 60 + startMinutes;

        var endHour = parseInt(endTime.split(':')[0], 10);
        var endMinutes = parseInt(endTime.split(':')[1], 10);
        var endTimeInMinutes = endHour * 60 + endMinutes;

        // Vérifier si l'heure actuelle est entre l'heure de début et de fin
        return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
    } catch (error) {
        console.error("Erreur lors de la vérification de l'heure : ", error);
        return false; // En cas d'erreur, on retourne false pour ne pas bloquer
    }
}


/**
 * Met à jour un paramètre d'URL sans recharger la page.
 *
 * @param {string} param - Le nom du paramètre à modifier ou ajouter.
 * @param {string} value - La valeur du paramètre à définir.
 */
function updateUrlParam(param, value) {
    // Récupérer l'URL actuelle
    var currentUrl = new URL(window.location);

    // Modifier ou ajouter le paramètre
    currentUrl.searchParams.set(param, value);

    // Mettre à jour l'URL sans recharger la page
    window.history.replaceState(null, '', currentUrl);
}





/**
 * Recharge la page actuelle avec un paramètre optionnel.
 *
 * Si un paramètre est fourni, la page est rechargée avec ce paramètre ajouté à l'URL.
 * Si aucun paramètre n'est fourni, la page est rechargée sans les paramètres de requête.
 *
 * @param {string|null} [param=null] - Le paramètre à ajouter à l'URL lors du rechargement de la page.
 */
function reloadPage(param = null){

    if ( param != null ){
        window.location.href = window.location.href.replace( /[\?#].*|$/, `${param}` );
    }

    else
    { 
        if ( window.location.href.split('?').length > 1 ){
            window.location.href = window.location.href.split('?')[0];
        }

        else 
            window.location.reload();
    }

}


/**
 * Vérifie si une chaine de caractères est un e-mail valide
 * @param {string} str e-mail à verifier
 * @returns {boolean}
 */
function isEmail(str)
{
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(str.match(regex))
        return true;
    else
        return false;
}




/**
 * Vérifie si une chaine de caractères est un téléphone valide
 * @param {string} str téléphone à verifier
 * @returns {boolean}
 */
function isPhone(str)
{
    let regex = /^[0-9]{2}( ?|.?)[0-9]{2}( ?|.?)[0-9]{2}( ?|.?)[0-9]{2}( ?|.?)[0-9]{2}( ?|.?)$/;

    if(str.match(regex))
        return true;
    else
        return false;
}

/**
 * Renvoie l'URL courante
 * @param {boolean} WithParam true avec paramètre | false sans paramètre
 */
function getUrl(WithParam = true)
{
    let current_url = window.location.href;

    if (!WithParam)
    {
        if (current_url.indexOf("?")>-1){
            current_url = current_url.substr(0,current_url.indexOf("?"));
        }
    }

    return current_url;
}

/**
 * Retourne le nombre de mois entre deux dates
 */
function monthDiff(d1, d2)
{
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

/**
 * Date format FR en string -> Object Date
 */
function date_fr_to_object(date)
{
    // month is 0-based, that's why we need date[1] - 1
    return new Date(+date[2], date[1] - 1, +date[0])
}



/**
 * Affiche des informations détaillées sur le paramètre donné dans la console.
 *
 * @param {*} param - Le paramètre à inspecter et afficher.
 * @param {string} [color='white'] - La couleur du texte dans la console.
 *
 * @description
 * La fonction `dd` affiche des informations détaillées sur le type et le contenu du paramètre donné.
 * Elle gère les types suivants :
 * - null
 * - Object
 * - Array
 * - HTMLElement
 * - Number
 * - String
 * - Function
 * - Autres types primitifs
 *
 * Les informations sont affichées dans la console avec un style de texte en gras et en couleur.
 */
function dd(param, color = 'white') {
    const style = `color: ${color}; font-weight: bold;`;
    let typeInfo = '';

    if (param === null) {
        typeInfo = 'null';
        console.log(`%c${typeInfo}`, style);
    } else if (typeof param === 'object' && !Array.isArray(param)) {
        // Objet
        const keys = Object.keys(param);
        typeInfo = `Object with ${keys.length} keys`;
        console.group(`%c${typeInfo}`, style);
        if (keys.length > 0) {
            console.table(param);
        } else {
            console.log('%c{}', style);
        }
        console.groupEnd();
    } else if (Array.isArray(param)) {
        // Tableau
        typeInfo = `Array with ${param.length} elements`;
        console.group(`%c${typeInfo}`, style);
        console.table(param);
        console.groupEnd();
    } else if (param instanceof HTMLElement) {
        // Élément du DOM
        typeInfo = 'DOM Element';
        console.group(`%c${typeInfo}`, style);
        console.log('%c' + param.outerHTML, style);
        console.table(param);
        console.groupEnd();
    } else if (typeof param === 'number') {
        // Nombre
        typeInfo = 'Number';
        console.log(`%c${typeInfo}: ${param}`, style);
    } else if (typeof param === 'string') {
        // Chaîne de caractères
        typeInfo = `String with ${param.length} characters`;
        console.log(`%c${typeInfo}: ${param}`, style);
    } else if (typeof param === 'function') {
        // Fonction
        typeInfo = 'Function';
        console.group(`%c${typeInfo}`, style);
        console.log(param.toString());
        console.groupEnd();
    } else {
        // Autres types
        typeInfo = typeof param;
        console.log(`%c${typeInfo}: ${param}`, style);
    }
}






/**
 * Si la longueur de la chaîne est supérieure au nombre, renvoie la chaîne découpée depuis le début
 * jusqu'au nombre plus trois points. Sinon, retournez la chaîne.
 * @param str - la chaîne à tronquer
 * @param num - Le nombre de caractères à inclure dans la chaîne renvoyée.
 * @returns la chaîne avec le nombre de caractères spécifié dans le deuxième argument.
 */
function truncateString(str, num) {

    if (str.length > num)
      return str.slice(0, num) + "...";

    else
      return str;
}

/**
 * Génère un identifiant unique.
 *
 * @param {boolean} [returnHash=true] - Indique si l'identifiant doit être retourné sous forme de hash.
 * @returns {string} - L'identifiant unique généré, soit sous forme de hash, soit sous forme de chaîne brute.
 */
function uniqid( returnHash = true) {

    let hash = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

    const random 	= Math.floor(Math.random() * (1000 - 1)) + 1 + 1;
    const sec 		= Date.now() * random + Math.random() * 1000 * random;
    const id 		= sec.toString(16).replace(/\./g, "").padEnd(14, "0");

    return returnHash ?
        hash(`${id}${ `${Math.trunc(Math.random() * ( 100000000 + random ))}`}`) :
             `${id}${ `${Math.trunc(Math.random() * ( 100000000 + random ))}`}`  ;
};


/**
 * Vérifie si une valeur est numérique.
 *
 * @param {any} num - La valeur à vérifier.
 * @returns {boolean} - Retourne true si la valeur est numérique, sinon false.
 */
function isNumeric(num) {
    if (num === '' || num === null) {
        return false
    }
    return !isNaN(num)
}




/**
 * creer une adresse "temporaire" pour le telechargement/lire  le fichier à partur de son contenu en octect stream
 * @param contents - Le contenu encodé en base64 du fichier.
 * @returns Une URL blob.
 */
function createBlobUrl(contents) {
    const byteCharacters = atob(contents);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });


    return window.URL.createObjectURL(blob);
}


/**
 * Crée une URL Blob pour un fichier PDF à partir d'une chaîne base64.
 *
 * @param {string} base64 - La chaîne base64 représentant le contenu du fichier PDF.
 * @returns {string} - L'URL Blob générée pour le fichier PDF.
 */
function createBlobUrlPDF( base64 ) {
    const binStr = atob( base64 );
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[ i ] = binStr.charCodeAt( i );
    }
    const blob =  new Blob( [ arr ], { type: 'application/pdf' } );
    const url = URL.createObjectURL( blob );
    return url;
}

/**
 * Tronque une chaîne de caractères si elle dépasse une certaine longueur et ajoute '...' à la fin.
 *
 * @param {string} str - La chaîne de caractères à tronquer.
 * @param {number} num - La longueur maximale de la chaîne de caractères.
 * @returns {string} - La chaîne de caractères tronquée avec '...' à la fin si elle dépasse la longueur maximale.
 */
function truncateString(str, num) {
  
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }



/**
 * Convertit une couleur RGB en format hexadécimal.
 *
 * @param {string} rgb - La chaîne de caractères représentant la couleur au format "rgb(r, g, b)".
 * @returns {string} La couleur au format hexadécimal, précédée du caractère "#".
 */
  function rgbToHex(rgb) {
    // récupération des valeurs de r, g et b depuis la chaîne "rgb(r, g, b)"
    const [r, g, b] = rgb.match(/\d+/g).map(Number);

    // conversion en format hexadécimal
    const hex = ((r << 16) | (g << 8) | b).toString(16);

    // ajout de zéros non significatifs si nécessaire
    return "#" + hex.padStart(6, "0");
  }


/**
 * Convertit une couleur RGB en code hexadécimal.
 *
 * @param {string} rgb - La chaîne de caractères représentant la couleur RGB (par exemple, "rgb(255, 0, 0)").
 * @returns {string} - La couleur en format hexadécimal (par exemple, "#ff0000").
 */
  function rgbToHex(rgb) {
    let matches = rgb.match(/\d+/g);
    let [r, g, b] = matches.map(Number);
    let hex = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + hex.padStart(6, "0");
}

/**
 * Convertit une couleur RGB en HSL.
 *
 * @param {number} r - La composante rouge de la couleur (0-255).
 * @param {number} g - La composante verte de la couleur (0-255).
 * @param {number} b - La composante bleue de la couleur (0-255).
 * @returns {number[]} Un tableau contenant les valeurs HSL :
 *                      - h : Teinte (0-1)
 *                      - s : Saturation (0-1)
 *                      - l : Luminosité (0-1)
 */
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // Achromatic
    } else {
        let diff = max - min;
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
        switch (max) {
            case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
            case g: h = (b - r) / diff + 2; break;
            case b: h = (r - g) / diff + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Convertit une couleur HSL en RGB.
 *
 * @param {number} h - La teinte (hue), une valeur entre 0 et 1.
 * @param {number} s - La saturation, une valeur entre 0 et 1.
 * @param {number} l - La luminosité (lightness), une valeur entre 0 et 1.
 * @returns {number[]} Un tableau contenant les valeurs RGB correspondantes, chaque valeur étant comprise entre 0 et 255.
 */
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Convertit une valeur de teinte en une valeur RGB.
 *
 * @param {number} p - La première valeur de couleur.
 * @param {number} q - La deuxième valeur de couleur.
 * @param {number} t - La valeur de teinte à convertir.
 * @returns {number} La valeur RGB correspondante.
 */
function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
}

/**
 * Convertit une couleur hexadécimale en une couleur RGB.
 *
 * @param {string} hex - La couleur hexadécimale à convertir (par exemple, "#FFFFFF").
 * @returns {number[]} Un tableau contenant les valeurs RGB correspondantes [r, g, b].
 */
function hexToRgb(hex) {
    let [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return [r, g, b];
}

/**
 * Calcule les filtres CSS nécessaires pour transformer une couleur en une autre.
 *
 * @param {string} color1 - La couleur de départ en format hexadécimal.
 * @param {string} color2 - La couleur cible en format hexadécimal.
 * @param {boolean} [style=false] - Si vrai, retourne une chaîne de caractères CSS. Sinon, retourne un objet.
 * @returns {string|Object} - Une chaîne de caractères CSS si `style` est vrai, sinon un objet avec les transformations.
 */
function calculateFilter(color1, color2, style = false) {
    let [h1, s1, l1] = rgbToHsl(...hexToRgb(color1));
    let [h2, s2, l2] = rgbToHsl(...hexToRgb(color2));

    let hueRotate = ((h2 - h1) * 360) % 360;
    let saturation = s2 / s1;

    if (style) {
        return `filter: hue-rotate(${hueRotate}deg) saturate(${saturation})`;
    } else {
        return { 'hue-rotate': hueRotate, 'saturate': saturation };
    }
}

/**
 * Retourne une étiquette descriptive basée sur l'extension de fichier fournie.
 *
 * @param {string} extension - L'extension du fichier (par exemple, 'jpg', 'pdf', 'docx').
 * @returns {string} Une étiquette descriptive correspondant à l'extension du fichier.
 *
 * @example
 * getLabelFromExtension('jpg'); // Retourne 'Image'
 * getLabelFromExtension('pdf'); // Retourne 'Document PDF'
 * getLabelFromExtension('mp3'); // Retourne 'Fichier audio'
 */
function getLabelFromExtension(extension) {
    const ext = extension.toLowerCase();
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'svg':
        case 'webp':
        case 'tiff':
        case 'ico':
            return 'Image';
        case 'pdf':
            return 'Document PDF';
        case 'doc':
        case 'docx':
            return 'Document Word';
        case 'xls':
        case 'xlsx':
        case 'csv':
            return 'Document Excel';
        case 'ppt':
        case 'pptx':
            return 'Présentation PowerPoint';
        case 'txt':
        case 'rtf':
        case 'csv':
            return 'Fichier texte';
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
            return 'Archive compressée';
        case 'mp3':
        case 'wav':
        case 'flac':
        case 'aac':
        case 'ogg':
        case 'wma':
            return 'Fichier audio';
        case 'mp4':
        case 'avi':
        case 'mkv':
        case 'flv':
        case 'mov':
        case 'wmv':
            return 'Fichier vidéo';
        case 'html':
        case 'htm':
        case 'php':
        case 'asp':
        case 'aspx':
        case 'jsp':
            return 'Fichier Web';
        case 'js':
        case 'css':
        case 'json':
        case 'xml':
            return 'Fichier de code';
        default:
            return ext.charAt(0).toUpperCase() + ext.slice(1);
    }
}


/**
 * Remplit aléatoirement tous les champs d'un formulaire.
 * 
 * Cette fonction sélectionne tous les éléments de formulaire (input, select, textarea) 
 * et leur attribue une valeur aléatoire en fonction de leur type.
 * 
 * - Les champs de type 'text', 'email', 'tel', et 'url' reçoivent une chaîne de caractères aléatoire.
 * - Les champs de type 'number' reçoivent un nombre aléatoire entre 0 et 99.
 * - Les champs de type 'date' reçoivent une date aléatoire entre le 1er janvier 2022 et aujourd'hui.
 * - Les champs de type 'checkbox' et 'radio' sont cochés ou décochés aléatoirement.
 * - Les champs de type 'select-one' et 'select-multiple' reçoivent des valeurs aléatoires parmi leurs options disponibles.
 * 
 * Les champs de type 'hidden', 'submit', ainsi que ceux qui sont en lecture seule (readOnly) ou désactivés (disabled) 
 * ne sont pas modifiés.
 * 
 * @function remplirFormulaireAleatoirement
 */
  function remplirFormulaireAleatoirement() {
    // Sélectionner tous les inputs, les selects, etc. dans le formulaire
    const inputs = document.querySelectorAll('input, select, textarea');

    // Parcourir tous les éléments sélectionnés
    inputs.forEach((input) => {
      // Générer une valeur aléatoire en fonction du type d'élément

        if (input.type === 'hidden' ||input.type === 'submit' || input.readOnly || input.disabled ) {
            return;
        }

      let value;
      switch (input.type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'url':
          value = Math.random().toString(36).substring(7);
          break;
        case 'number':
          value = Math.floor(Math.random() * 100);
          break;
        case 'date':
          const start = new Date(2022, 0, 1);
          const end = new Date();
          value = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
          break;
        case 'checkbox':
        case 'radio':
          value = Math.random() < 0.5;
          break;
        case 'select-one':
          const options = input.querySelectorAll('option');
          const index = Math.floor(Math.random() * options.length);
          value = options[index].value;
          // Définir la valeur du champ avec la méthode val() de jQuery
          $(input).val(value);
          // Déclencher l'événement change sur l'élément <select>
          $(input).trigger('change');
          return;
        case 'select-multiple':
          const selectedOptions = input.querySelectorAll('option');
          const selectedValues = [];
          selectedOptions.forEach((option) => {
            if (Math.random() < 0.5) {
              option.selected = true;
              selectedValues.push(option.value);
            } else {
              option.selected = false;
            }
          });
          // Définir la valeur du champ avec la méthode val() de jQuery
          $(input).val(selectedValues);
          // Déclencher l'événement change sur l'élément <select>
          $(input).trigger('change');
          return;
        default:
          return;
      }

      // Remplir l'élément avec la valeur aléatoire
      input.value = value;
    });
  }



/**
 * Détecte le type d'appareil en fonction de l'agent utilisateur.
 *
 * @returns {string} - Retourne 'mobile' si l'appareil est un mobile ou une tablette, sinon 'desktop'.
 */
  function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();

    const isMobile = /iphone|ipod|android.*mobile|blackberry|windows phone/.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet|kindle|playbook|silk|puffin(?!.*(IP|AP|WP))/.test(userAgent);


    if (isMobile || isTablet) {
      return 'mobile';
    } else {
      return 'desktop';
    }
  }






  









