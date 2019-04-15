/**
 * @param {string} templateId
 * @param {Object.<string, *>} templateData
 * @return {ChildNode}
 */
export function createFromTemplate(templateId, templateData) {
    const scriptElement = document.querySelector(`#${templateId}`);
    const templateAsString = scriptElement.innerHTML;

    let templateWithData = templateAsString.replace(
                            /{([^{}]*) \? ([^{}]*) : ([^{}]*)}/g,
                            (foundSubstring, dataKey, trueBranch, falseBranch) => {
        const result = templateData[dataKey];
        if (typeof result === 'boolean') {
            return result ? trueBranch : falseBranch;
        } else {
            return foundSubstring;
        }
    });

    templateWithData = templateWithData.replace(/{([^{}]*)}/g, (foundSubstring, dataKey) => {
        const result = templateData[dataKey];
        return typeof result === 'string' || typeof result === 'number' ? result : foundSubstring;
     });

    const div = document.createElement('div');
    div.innerHTML = templateWithData;

    return div.children[0];
}


