function encode(val: string) {
    return Ti.Network.encodeURIComponent(val)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}

export default function buildUrl(url: string, params: any, paramsSerializer: ((params: any) => string) | undefined): string {
    if (!params) {
        return url;
    }

    let serializedParams = '';
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else {
        const parts: string[] = [];

        Object.keys(params).forEach(key => {
            let val = params[key];
            if (val === null || typeof val === 'undefined') {
                return;
            }

            if (Array.isArray(val)) {
                key = key + '[]';
            } else {
                val = [val];
            }

            for (let v of val) {
                if (v instanceof Date) {
                    v = v.toISOString();
                } else if (typeof v === 'object') {
                    v = JSON.stringify(v);
                }
                parts.push(encode(key) + '=' + encode(v));
            }
        });

        serializedParams = parts.join('&');
    }

    if (serializedParams) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
}
