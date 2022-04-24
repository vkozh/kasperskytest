import {
    selectors,
    devices,
    innerDevicesContainer
}
from '../utils/constants';
export default class Select {
    constructor(setPrice) {
        this._selectElement = document.createElement('div');
        this._containerOptions = document.createElement('div');
        this._setPrice = setPrice;
    }

    generate() {
        this._selectElement.className = selectors.selectedDevices;
        this._setFirstElementValue();

        this._containerOptions.className = selectors.optionsContainer;
        this._containerOptions.classList.add(selectors.optionsContainerHidden);

        this.update();
        this._setEventListeners();
    }

    _setFirstElementValue() {
        this._selectElement.innerHTML = '';
        const text = devices.options[devices.selectedIndex].text;
        this._selectElement.textContent = text.slice(0, -7);
    }

    _handleOptionCLick(e) {
        const index = e.target.dataset.index;
        devices.options[index].selected = true;
        this._close();
    }

    _createOptionElement(option, i) {
        const element = document.createElement('div');
        element.className = selectors.device;
        element.textContent = option.innerHTML;
        element.setAttribute('data-index', i)
        element.addEventListener('click', (e) => {
            this._handleOptionCLick(e);
            this.update();
            this._setPrice();
        });
        return element;
    }

    update() {
        this.options = [];
        this._setFirstElementValue();
        this._containerOptions.innerHTML = '';
        for (let i = 0; i < devices.options.length; i++) {
            this.options.push(this._createOptionElement(devices.options[i], i));
        };
        this._render();
    }

    _render() {
        innerDevicesContainer.appendChild(this._selectElement);
        innerDevicesContainer.appendChild(this._containerOptions);
        this.options.forEach(option => this._containerOptions.appendChild(option))
    }

    _setEventListeners() {
        this._selectElement.addEventListener('click', () => this._toggle());
        document.addEventListener('click', (e) => this._handleClick(e));
    }

    _close() {
        this._containerOptions.classList.add(selectors.optionsContainerHidden);
    }

    _handleClick(e) {
        if (!this._selectElement.contains(e.target))
            this._close();
    }

    _toggle() {
        this._containerOptions.classList.toggle(selectors.optionsContainerHidden);
    }

    getSelected() {
        console.log(this._selectElement.textContent)
        return this._selectElement.textContent;
    }
}