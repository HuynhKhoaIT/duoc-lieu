import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize HTML để tránh XSS
 * @param {string} html - Chuỗi HTML từ API
 * @returns {string} - Chuỗi HTML đã được làm sạch
 */
export function sanitizeHTML(html) {
    if (!html) return "";
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            "p",
            "b",
            "i",
            "u",
            "strong",
            "em",
            "br",
            "ul",
            "ol",
            "li",
            "span",
            "div",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "a",
            "img",
            "blockquote",
        ],
        ALLOWED_ATTR: [ "href", "title", "alt", "src", "style" ],
    });
}
