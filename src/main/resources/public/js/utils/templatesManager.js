/**
 * @param {string} templateId
 * @param {Object.<string, *>} templateData
 * @return {ChildNode}
 */
export function createFromTemplate(templateId, templateData) {
    const scriptElement = document.querySelector(`#${templateId}`);
    const templateAsString = scriptElement.innerHTML;

    const templateWithData = templateAsString.replace(/{([^{}]*)}/g, (foundSubstring, dataKey) => {
        const result = escapeHtml(templateData[dataKey]);

        return typeof result === 'string'
        || typeof result === 'number'
            ? result
            : foundSubstring;
    });

    const div = document.createElement('div');
    div.innerHTML = templateWithData;

    return div.children[0];
}

export function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML.replace(/"/g, "&quot;");
}
