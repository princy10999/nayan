

export const TitleCaseConverter = (title = '', converter = '_') => {

    if (title && typeof title === 'string' && converter && typeof converter === 'string') {
        return title.split(converter).map(txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()).join(' ');
    }

    return null;
}

export const setSuggestionListExpireTime = (minutesToAdd = 10) => {

    const currentTime = new Date();
    const expireTime = new Date(currentTime.getTime() + minutesToAdd * 60000);

    localStorage.setItem('suggestionExpireTime', expireTime.getTime())
}

export const isSuggestionListTimeExpired = () => {
    const currentTime = new Date();
    const expireTime = localStorage.getItem('suggestionExpireTime');

    if (!expireTime) {
        setSuggestionListExpireTime()
        return true;
    }

    return new Date(JSON.parse(expireTime)) < currentTime
}