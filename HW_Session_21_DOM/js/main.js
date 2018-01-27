'user strict';
(function() {
    let domElements = {
        btn: document.getElementById("play"),
        firstBlock: document.querySelector('#first-line'),
        secondBlock: document.querySelector('#second-line'),
        thirdBlock: document.querySelector('#third-line'),
        typeGallerySelector: document.querySelector('#type-selector'),
        countGallerySelector: document.querySelector('#line-selector')
    };

    let domElementsArr = [
        document.querySelector('#first-line'),
        document.querySelector('#second-line'),
        document.querySelector('#third-line')
    ];

    const transformUrl = str => (str.indexOf('http://') !== 0) ? `http://${str}` : `${str}`;

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD hh:mm');

    let templateForReplace = item => {
        let template = '<div class="col-sm-3 col-xs-6">\
                                    <img src="$url" alt="$name" class="img-thumbnail">\
                                            <div class="info-wrapper">\
                                            <div class="text-muted">$name</div>\
                                            <div class="text-muted top-padding">$description</div>\
                                            <div class="text-muted">$date</div>\
                                        </div>\
                                    </div>';
        return template
            .replace(/\$name/gi, transformName(item.name))
            .replace("$url", transformUrl(item.url))
            .replace("$description", transformDescription(item.description))
            .replace("$date", getFormattedDate(item.date));
    };

    let templateForES6 = function(item) {
        return `<div class="col-sm-3 col-xs-6">\
                    <img src="${transformUrl(item.url)}" alt="${transformName(item.name)}" class="img-thumbnail">\
                    <div class="info-wrapper">\
                        <div class="text-muted">${transformName(item.name)}</div>\
                        <div class="text-muted top-padding">${transformDescription(item.description)}</div>\
                        <div class="text-muted">${getFormattedDate(item.date)}</div>\
                    </div>\
                </div>`;
    };

    let templateForCreateElements = function(item) {
        let div = document.createElement('div'),
            img = document.createElement('img'),
            wrapper = document.createElement('div'),
            divWithName = document.createElement('div'),
            divWithDescription = document.createElement('div'),
            divWithDate = document.createElement('div');

        div.classList.add('col-sm-3', 'col-xs-6');
        img.classList.add('img-thumbnail');
        img.setAttribute('src', transformUrl(item.url));
        img.setAttribute('alt', transformName(item.name));
        wrapper.classList.add('info-wrapper');
        divWithName.classList.add('text-muted');
        divWithName.innerHTML = transformName(item.name);
        divWithDescription.classList.add('text-muted', 'top-padding');
        divWithDescription.innerHTML = transformDescription(item.description);
        divWithDate.classList.add('text-muted');
        divWithDate.innerHTML = getFormattedDate(item.date);

        div.appendChild(img);
        div.appendChild(wrapper);
        wrapper.appendChild(divWithName);
        wrapper.appendChild(divWithDescription);
        wrapper.appendChild(divWithDate);

        return div;
    };

    const templateMap = [templateForReplace, templateForES6, templateForCreateElements];

    const iteration = (count, arr, template) => {
        let result = '';
        let resultObj = document.createElement('div');
        for (let i = 0; i < count; i++) {
            let res = template(arr[i]);

            if (typeof res === 'string') {result += res;}
            else resultObj.appendChild(res);
        }
        return result || resultObj;
    };

    const getNumberOfImages = (arr) => {
        let count = domElements.countGallerySelector.value;
        switch (count) {
            case '1':
                return 3;
            case '2':
                return 6;
            default :
                return arr.length;
        }
    };

    const displayCurrentBlock = value => {
        let section = ['.first-group', '.second-group', '.third-group'];

        for (let i = 0; i < section.length; i++) {
            if (i === value) {
                document.querySelector(section[i]).classList.remove("hide");
                document.querySelector(section[i]).classList.add('show');
            } else {
                document.querySelector(section[i]).classList.add("hide");
                document.querySelector(section[i]).classList.remove('show');
            }
        }
    };

    function buildGalleryByTmp(count, value, arr) {
        let numberOfImages = getNumberOfImages(arr);
        return iteration(numberOfImages, arr, templateMap[value]);
    };

    function insertHtmlToDOM(html, value) {
        if (typeof html === 'string') {
            domElementsArr[value].innerHTML = html;
        } else {
            domElementsArr[value].innerHTML = '';
            domElementsArr[value].appendChild(html);
        }
    }

    function showGallery() {
        let value = domElements.typeGallerySelector.value - 1;
        let count = domElements.countGallerySelector.value;

        let htmlData = buildGalleryByTmp(count, value, data);
        insertHtmlToDOM(htmlData, value);
        displayCurrentBlock(value);
    };
    domElements.btn.addEventListener("click", showGallery);
})();